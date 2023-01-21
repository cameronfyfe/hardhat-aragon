"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateArtifacts = void 0;
const task_names_1 = require("hardhat/builtin-tasks/task-names");
const task_names_2 = require("../../task-names");
const constants_1 = require("../../constants");
const fsUtils_1 = require("../fsUtils");
const generateAragonArtifact_1 = require("./generateAragonArtifact");
/**
 * Generate and write aragon artifacts to outPath
 * - artifact
 * - manifest
 * - flatCode
 * @param outPath "dist"
 * @param hre
 */
async function generateArtifacts(arapp, appName, appContractName, hre) {
    const { roles: appRoles, dependencies: appDependencies = [] } = arapp;
    await hre.run(task_names_2.TASK_COMPILE_CONTRACT);
    // Get ABI from generated artifacts in compilation
    const { abi } = await hre.artifacts.readArtifact(appContractName);
    // hardhat will detect and throw for cyclic dependencies
    // any flatten task also compiles
    const flatCode = await hre.run(task_names_1.TASK_FLATTEN_GET_FLATTENED_SOURCE);
    const aragonArtifact = (0, generateAragonArtifact_1.generateAragonArtifact)(appName, appContractName, appRoles, appDependencies, abi, flatCode);
    const manifest = (0, fsUtils_1.readJson)(constants_1.MANIFEST_NAME);
    return { artifact: aragonArtifact, manifest, flatCode };
}
exports.generateArtifacts = generateArtifacts;
//# sourceMappingURL=generateArtifacts.js.map