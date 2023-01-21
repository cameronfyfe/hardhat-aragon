"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploySubtask = exports.deployTask = void 0;
const task_names_1 = require("../task-names");
const logger_1 = require("../utils/logger");
/**
 * Task to deploy a contract
 * @param args contract deployment arguments
 * @param hre hardhat runtime environment
 * @returns
 */
async function deployTask({ contract, constructorArgsPath: constructorArgsModule, constructorArgsParams, confirmations, verify, dryRun, }, { run }) {
    const constructorArguments = await run(task_names_1.TASK_GET_CONSTRUCTOR_ARGS, {
        constructorArgsModule,
        constructorArgsParams,
    });
    return run(task_names_1.TASK_DEPLOY_SUBTASK, {
        contract,
        constructorArguments,
        confirmations,
        verify,
        dryRun,
    });
}
exports.deployTask = deployTask;
/**
 * Subtask to deploy a contract
 * @param args
 * @param hre
 * @returns
 */
async function deploySubtask({ contract, constructorArguments, confirmations, verify, dryRun, }, hre) {
    await hre.run(task_names_1.TASK_COMPILE_CONTRACT);
    if (dryRun) {
        return deployContractDryRun({ contract, constructorArguments }, hre);
    }
    const contractAddress = await deployContract({
        contract,
        constructorArguments,
        confirmations,
    }, hre);
    if (verify) {
        await verifyContract({ contractAddress, constructorArguments }, hre);
    }
    return contractAddress;
}
exports.deploySubtask = deploySubtask;
/**
 *
 * @param args contract name and constructor arguments
 * @param hre hardhat runtime environment with ethers library
 * @returns
 */
async function deployContractDryRun({ contract, constructorArguments = [] }, { ethers }) {
    (0, logger_1.log)('DRY RUN: Contract creation');
    const factory = await ethers.getContractFactory(contract);
    factory.getDeployTransaction(...constructorArguments);
    const [signer] = await ethers.getSigners();
    const tx = {
        from: signer.address,
        nonce: await ethers.provider.getTransactionCount(signer.address),
    };
    (0, logger_1.log)(`  from:  ${tx.from}`);
    (0, logger_1.log)(`  nonce: ${tx.nonce}`);
    const contractAddress = ethers.utils.getContractAddress(tx);
    (0, logger_1.log)(`  New contract address: ${contractAddress}`);
    return contractAddress;
}
/**
 * Deploy a contract
 * @param args contract name, contractor arguments and confirmations
 * @param hre hardhat runtime environment with ethers library
 * @returns
 */
async function deployContract({ contract, constructorArguments = [], confirmations, }, { ethers }) {
    (0, logger_1.log)('Deploying new contract.');
    const factory = await ethers.getContractFactory(contract);
    const deployment = await factory.deploy(...constructorArguments);
    const contractAddress = deployment.address;
    await deployment.deployTransaction.wait(confirmations);
    (0, logger_1.log)(`New contract address: ${contractAddress}`);
    return contractAddress;
}
/**
 * Verify contract using hardhat verify contract subtask
 * @param args: contract address and contract constructor arguments
 * @param hre: hardhat runtime environment
 */
async function verifyContract({ contractAddress, constructorArguments }, { run }) {
    (0, logger_1.log)(`Verifying contract address: ${contractAddress}`);
    try {
        await run(task_names_1.TASK_VERIFY_CONTRACT, {
            address: contractAddress,
            constructorArguments,
        });
    }
    catch (e) {
        // do not stop on contract verification error
        // let user verify manually later
        (0, logger_1.log)(`Error verifying contract ${e.message}`);
        (0, logger_1.log)('Please verify the contract manually later');
    }
}
//# sourceMappingURL=deploy.js.map