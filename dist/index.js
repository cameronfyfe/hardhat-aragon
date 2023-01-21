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
const path_1 = __importDefault(require("path"));
const config_1 = require("hardhat/config");
const types = __importStar(require("hardhat/internal/core/params/argumentTypes"));
const constants_1 = require("./constants");
const task_names_1 = require("./task-names");
const publish_1 = require("./tasks/publish");
const deploy_1 = require("./tasks/deploy");
// We ommit these imports beacuse they are peer dependencies and will be added
// by the plugin user. Otherwise naming conflicts may araise
// import '@nomiclabs/hardhat-ethers'
// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.
require("./types/type-extensions");
(0, config_1.extendConfig)((config, userConfig) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    config.ipfs = {
        url: (_b = (_a = userConfig.ipfs) === null || _a === void 0 ? void 0 : _a.url) !== null && _b !== void 0 ? _b : constants_1.DEFAULT_IPFS_API_ENDPOINT,
        gateway: (_d = (_c = userConfig.ipfs) === null || _c === void 0 ? void 0 : _c.gateway) !== null && _d !== void 0 ? _d : constants_1.DEFAULT_IPFS_GATEWAY,
    };
    config.aragon = {
        appSrcPath: path_1.default.normalize(path_1.default.join(config.paths.root, (_f = (_e = userConfig.aragon) === null || _e === void 0 ? void 0 : _e.appSrcPath) !== null && _f !== void 0 ? _f : constants_1.DEFAULT_APP_SRC_PATH)),
        appBuildOutputPath: path_1.default.normalize(path_1.default.join(config.paths.root, (_h = (_g = userConfig.aragon) === null || _g === void 0 ? void 0 : _g.appBuildOutputPath) !== null && _h !== void 0 ? _h : constants_1.DEFAULT_APP_BUILD_PATH)),
        appBuildScript: (_k = (_j = userConfig.aragon) === null || _j === void 0 ? void 0 : _j.appBuildScript) !== null && _k !== void 0 ? _k : constants_1.DEFAULT_APP_BUILD_SCRIPT,
        ignoreFilesPath: path_1.default.normalize(path_1.default.join(config.paths.root, (_m = (_l = userConfig.aragon) === null || _l === void 0 ? void 0 : _l.ignoreFilesPath) !== null && _m !== void 0 ? _m : constants_1.DEFAULT_IGNORE_PATH)),
        confirmations: (_p = (_o = userConfig.aragon) === null || _o === void 0 ? void 0 : _o.confirmations) !== null && _p !== void 0 ? _p : constants_1.DEFAULT_CONFIRMATIONS,
    };
});
(0, config_1.task)(task_names_1.TASK_PUBLISH, 'Publish a new app version to Aragon Package Manager')
    .addPositionalParam('bump', 'Type of bump (major, minor or patch) or semantic version', undefined, types.string)
    .addOptionalParam('contract', 'Contract address previously deployed.', undefined, types.string)
    .addOptionalParam('ipfsApiUrl', 'IPFS API URL to connect to an ipfs daemon API server', 'http://localhost:5001', types.string)
    .addOptionalParam('confirmations', 'Number of blocks to wait for contract creation', undefined, types.int)
    .addOptionalParam('constructorArgsPath', 'File path to a javascript module that exports the list of constructor arguments.', undefined, types.inputFile)
    .addOptionalVariadicPositionalParam('constructorArgsParams', 'Contract constructor arguments. Ignored if the --constructor-args-path option is used.', [])
    .addFlag('onlyContent', 'Prevents contract compilation, deployment, and artifact generation.')
    .addFlag('verify', 'Automatically verify contract on Etherscan.')
    .addFlag('skipAppBuild', 'Skip application build.')
    .addFlag('skipValidation', 'Skip validation of artifacts files.')
    .addFlag('dryRun', 'Output tx data without broadcasting')
    .addFlag('validateUpload', 'Validate new content uploaded to ipfs')
    .setAction(publish_1.publishTask);
(0, config_1.task)(task_names_1.TASK_DEPLOY, 'Deploy a contract')
    .addParam('contract', 'Contract name or fully qualified name, contract/Projects.sol:Projects', undefined, types.string)
    .addOptionalParam('confirmations', 'number of blocks to wait for contract deployment', undefined, types.int)
    .addFlag('verify', 'Automatically verify contract on Etherscan.')
    .addFlag('dryRun', 'Output contract address without actually creating it')
    .addOptionalParam('constructorArgsPath', 'File path to a javascript module that exports the list of arguments.', undefined, types.inputFile)
    .addOptionalVariadicPositionalParam('constructorArgsParams', 'Contract constructor arguments. Ignored if the --constructor-args-path option is used.', [])
    .setAction(deploy_1.deployTask);
(0, config_1.subtask)(task_names_1.TASK_DEPLOY_SUBTASK)
    .addParam('contract', undefined, undefined, types.string)
    .addOptionalParam('confirmations', 'number of blocks to wait', undefined, types.int)
    .addFlag('verify')
    .addFlag('dryRun')
    .addOptionalParam('constructorArguments', undefined, [], types.any)
    .setAction(deploy_1.deploySubtask);
//# sourceMappingURL=index.js.map