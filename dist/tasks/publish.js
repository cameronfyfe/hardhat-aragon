"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishTask = void 0;
const execa_1 = __importDefault(require("execa"));
const errors_1 = require("../errors");
const constants_1 = require("../constants");
const logger_1 = require("../utils/logger");
const apm = __importStar(require("../utils/apm"));
const artifact_1 = require("../utils/artifact");
const createIgnorePatternFromFiles_1 = __importDefault(require("../utils/createIgnorePatternFromFiles"));
const parseAndValidateBumpOrVersion_1 = __importDefault(require("../utils/parseAndValidateBumpOrVersion"));
const prettyOutput_1 = require("../utils/prettyOutput");
const fsUtils_1 = require("../utils/fsUtils");
const ipfs_1 = require("../utils/ipfs");
const task_names_1 = require("../task-names");
const arappUtils_1 = require("../utils/arappUtils");
const fs_1 = __importDefault(require("fs"));
async function publishTask(args, hre) {
    var _a;
    const haveEtherscanApiKey = hre.config.etherscan && Boolean(hre.config.etherscan.apiKey);
    if (args.verify && !haveEtherscanApiKey)
        throw new errors_1.AragonPluginError(`To verify your contracts you need to configure etherscan.apiKey in hardhat.config.json`);
    const [owner] = await hre.ethers.getSigners();
    // Do param type verification here and call publishTask with clean params
    const bumpOrVersion = args.bump;
    const existingContractAddress = args.contract;
    const { appSrcPath, appBuildOutputPath, appBuildScript, ignoreFilesPath, } = hre.config.aragon;
    const arapp = (0, arappUtils_1.readArapp)();
    const finalAppEnsName = (0, arappUtils_1.parseAppName)(arapp, hre.network.name);
    const appContractName = (0, arappUtils_1.getMainContractName)();
    const ensRegistry = (0, arappUtils_1.getEnsRegistry)(arapp, hre.network.name);
    const ipfsApiUrl = args.ipfsApiUrl || hre.config.ipfs.url;
    // Setup provider with the right ENS registy address
    let provider;
    if (hre.network.name === 'hardhat') {
        hre.ethers.provider.network.ensAddress = ensRegistry;
        provider = hre.ethers.provider;
    }
    else {
        const { chainId } = await hre.ethers.provider.getNetwork();
        provider = new hre.ethers.providers.JsonRpcProvider(hre.network.config.url, {
            name: hre.network.name,
            ensAddress: ensRegistry,
            chainId,
        });
    }
    const prevVersion = await apm.getLastestVersionIfExists(finalAppEnsName, provider);
    const { bump, nextVersion } = (0, parseAndValidateBumpOrVersion_1.default)(bumpOrVersion, prevVersion ? prevVersion.version : undefined);
    (0, logger_1.log)(`Applying version bump ${bump}, next version: ${nextVersion}`);
    // Do sanity checks before compiling the contract or uploading files
    // So users do not have to wait a long time before seeing the config is not okay
    await apm.assertCanPublish(finalAppEnsName, owner.address, provider);
    const ipfs = await (0, ipfs_1.assertIpfsApiIsAvailable)(ipfsApiUrl);
    // Using let + if {} block instead of a ternary operator
    // to assign value and log status to console
    let contractAddress;
    if (args.onlyContent) {
        contractAddress = hre.ethers.constants.AddressZero;
        (0, logger_1.log)('No contract used for this version');
    }
    else if (existingContractAddress) {
        contractAddress = existingContractAddress;
        (0, logger_1.log)(`Using provided contract address: ${contractAddress}`);
    }
    else if (!prevVersion || bump === 'major') {
        const confirmations = args.confirmations || ((_a = hre.config.aragon) === null || _a === void 0 ? void 0 : _a.confirmations);
        const constructorArguments = await hre.run(task_names_1.TASK_GET_CONSTRUCTOR_ARGS, {
            constructorArgsModule: args.constructorArgsPath,
            constructorArgsParams: args.constructorArgsParams,
        });
        contractAddress = await hre.run(task_names_1.TASK_DEPLOY_SUBTASK, {
            contract: appContractName,
            constructorArguments,
            confirmations,
            verify: args.verify,
            dryRun: args.dryRun,
        });
    }
    else {
        contractAddress = prevVersion.contractAddress;
        (0, logger_1.log)(`Reusing previous version contract address: ${contractAddress}`);
    }
    // Write env var file for contract address
    const dir = './_env';
    const fileName = `${dir}/.env_app-${appContractName}`;
    const fileContent = `
    export $APP_${appContractName.toUpperCase()}_ADDRESS=${contractAddress}
  `;
    (0, logger_1.log)(`Writing env var file to ${fileName}`);
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir);
    fs_1.default.writeFile(fileName, fileContent, 'utf8', () => { console.log('FS DONE.'); });
    if (!args.skipAppBuild && (0, fsUtils_1.pathExists)(appSrcPath)) {
        (0, logger_1.log)(`Running app build script...`);
        try {
            await (0, execa_1.default)('npm', ['run', appBuildScript], {
                cwd: appSrcPath,
            });
        }
        catch (e) {
            throw new errors_1.AragonPluginError(`Make sure the app dependencies were installed`);
        }
    }
    if (!args.onlyContent) {
        (0, logger_1.log)(`Generating Aragon app artifacts`);
        const content = await (0, artifact_1.generateArtifacts)(arapp, finalAppEnsName, appContractName, hre);
        (0, artifact_1.writeArtifacts)(appBuildOutputPath, content);
        if (!args.skipValidation) {
            const hasFrontend = appSrcPath ? true : false;
            (0, artifact_1.validateArtifacts)(appBuildOutputPath, appContractName, hasFrontend);
        }
    }
    // Upload release directory to IPFS
    (0, logger_1.log)('Uploading release assets to IPFS...');
    const contentHash = await (0, ipfs_1.uploadDirToIpfs)({
        dirPath: appBuildOutputPath,
        ipfs,
        ignore: (0, createIgnorePatternFromFiles_1.default)(ignoreFilesPath),
    });
    (0, logger_1.log)(`Release assets uploaded to IPFS: ${contentHash}`);
    if (args.validateUpload) {
        (0, logger_1.log)(`Validating assets uploaded to IPFS`);
        await (0, ipfs_1.assertUploadContentResolve)(contentHash, hre.config.ipfs.gateway);
        (0, logger_1.log)(`Finish validating assets uploaded to IPFS`);
    }
    // Generate tx to publish new app to aragonPM
    const versionInfo = {
        version: nextVersion,
        contractAddress,
        contentUri: apm.toContentUri('ipfs', contentHash),
    };
    const txData = await apm.publishVersion(finalAppEnsName, versionInfo, provider, {
        managerAddress: owner.address,
    });
    const activeIpfsGateway = await (0, ipfs_1.guessGatewayUrl)({
        ipfsApiUrl,
        ipfsGateway: hre.config.ipfs.gateway,
        contentHash,
    });
    (0, logger_1.log)((0, prettyOutput_1.getPrettyPublishTxPreview)({
        txData,
        appName: finalAppEnsName,
        nextVersion,
        bump,
        contractAddress,
        contentHash,
        ipfsGateway: activeIpfsGateway || constants_1.DEFAULT_IPFS_API_ENDPOINT,
    }));
    if (args.dryRun) {
        (0, logger_1.log)(prettyOutput_1.getPublishTxOutput.dryRun({
            txData,
            rootAccount: owner.address,
        }));
    }
    else {
        const tranactionResponse = await owner.sendTransaction({
            to: txData.to,
            data: apm.encodePublishVersionTxData(txData),
        });
        const { chainId } = await provider.getNetwork();
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const explorerTxUrl = constants_1.EXPLORER_CHAIN_URLS[chainId];
        (0, logger_1.log)(prettyOutput_1.getPublishTxOutput.txHash(tranactionResponse.hash, explorerTxUrl));
        const receipt = await tranactionResponse.wait();
        (0, logger_1.log)(prettyOutput_1.getPublishTxOutput.receipt(receipt));
    }
    // For testing
    return txData;
}
exports.publishTask = publishTask;
//# sourceMappingURL=publish.js.map