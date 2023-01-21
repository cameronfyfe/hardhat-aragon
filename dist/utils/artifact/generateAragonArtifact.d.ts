import { ethers } from 'ethers';
import { AragonArtifact, Dependencies, Role } from '../../types';
/**
 * Returns aragon artifact.json from app data
 * @param appName "finance" | "finance.aragonpm.eth"
 * @param contractName Target contract name or path: "Finance" | "contracts/Finance.sol"
 * @param roles
 * @param dependencies
 * @param abi
 * @param flatCode Flat code of target contract plus all imports
 */
export declare function generateAragonArtifact(appName: string, contractName: string, roles: Role[], dependencies: Dependencies[], abi: ethers.utils.Fragment[], flatCode: string): AragonArtifact;
//# sourceMappingURL=generateAragonArtifact.d.ts.map