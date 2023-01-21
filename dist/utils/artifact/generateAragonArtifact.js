"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAragonArtifact = void 0;
const ethers_1 = require("ethers");
const lodash_1 = require("lodash");
const appName_1 = require("../appName");
const ast_1 = require("../ast");
const abiFallback = {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback',
};
/**
 * Returns aragon artifact.json from app data
 * @param appName "finance" | "finance.aragonpm.eth"
 * @param contractName Target contract name or path: "Finance" | "contracts/Finance.sol"
 * @param roles
 * @param dependencies
 * @param abi
 * @param flatCode Flat code of target contract plus all imports
 */
function generateAragonArtifact(appName, contractName, roles, dependencies, abi, flatCode) {
    const abiBySignature = (0, lodash_1.keyBy)(new ethers_1.ethers.utils.Interface(abi).functions, (functionFragment) => functionFragment.format());
    const contractFunctions = (0, ast_1.parseContractFunctions)(flatCode, contractName, {
        onlyTargetContract: true,
    });
    return {
        // Artifact appears to require the abi of each function
        functions: contractFunctions.map((parsedFn) => ({
            roles: parsedFn.roles.map((role) => role.id),
            notice: parsedFn.notice,
            abi: abiBySignature[parsedFn.sig] ||
                (parsedFn.sig === 'fallback()' ? abiFallback : null),
            sig: parsedFn.sig,
        })),
        deprecatedFunctions: {},
        // Artifact appears to require the roleId to have bytes precomputed
        roles: roles.map((role) => (Object.assign(Object.assign({}, role), { bytes: ethers_1.ethers.utils.id(role.id) }))),
        dependencies,
        abi,
        // Additional metadata
        flattenedCode: './code.sol',
        appName,
        appId: (0, appName_1.getAppId)(appName),
    };
}
exports.generateAragonArtifact = generateAragonArtifact;
//# sourceMappingURL=generateAragonArtifact.js.map