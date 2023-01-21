import { DeployTaskArguments, DeploySubtaskArguments } from '../types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
/**
 * Task to deploy a contract
 * @param args contract deployment arguments
 * @param hre hardhat runtime environment
 * @returns
 */
export declare function deployTask({ contract, constructorArgsPath: constructorArgsModule, constructorArgsParams, confirmations, verify, dryRun, }: DeployTaskArguments, { run }: HardhatRuntimeEnvironment): Promise<any>;
/**
 * Subtask to deploy a contract
 * @param args
 * @param hre
 * @returns
 */
export declare function deploySubtask({ contract, constructorArguments, confirmations, verify, dryRun, }: DeploySubtaskArguments, hre: HardhatRuntimeEnvironment): Promise<string>;
//# sourceMappingURL=deploy.d.ts.map