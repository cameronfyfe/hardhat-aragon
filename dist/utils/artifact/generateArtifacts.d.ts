import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { AragonAppJson, RepoContent } from '../../types';
/**
 * Generate and write aragon artifacts to outPath
 * - artifact
 * - manifest
 * - flatCode
 * @param outPath "dist"
 * @param hre
 */
export declare function generateArtifacts(arapp: AragonAppJson, appName: string, appContractName: string, hre: HardhatRuntimeEnvironment): Promise<RepoContent>;
//# sourceMappingURL=generateArtifacts.d.ts.map