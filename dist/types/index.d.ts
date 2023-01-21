import { utils } from 'ethers';
import { HardhatArguments } from 'hardhat/types';
export interface IpfsUserConfig {
    url?: string;
    gateway?: string;
}
export interface IpfsConfig {
    url: string;
    gateway: string;
}
export interface Dependencies {
    appName: string;
    version: string;
    initParam: string;
    state: string;
    requiredPermissions: {
        name: string;
        params: string;
    }[];
}
export interface Role {
    name: string;
    id: string;
    params: string[];
}
export interface AragonConfig {
    appSrcPath: string;
    appBuildOutputPath: string;
    appBuildScript: string;
    ignoreFilesPath: string;
    confirmations: number;
}
export interface AragonUserConfig {
    appSrcPath?: string;
    appBuildOutputPath?: string;
    appBuildScript?: string;
    ignoreFilesPath?: string;
    confirmations?: number;
}
export interface AragonManifest {
    name: string;
    author: string;
    description: string;
    changelog_url: string;
    details_url: string;
    source_url: string;
    icons: {
        src: string;
        sizes: string;
    }[];
    screenshots: {
        src: string;
    }[];
    script: string;
    start_url: string;
}
export interface AragonArtifactFunction {
    roles: string[];
    sig: string;
    /**
     * This field might not be able if the contract does not use
     * conventional solidity syntax and Aragon naming standards
     * null if there in no notice
     */
    notice: string | null;
    /**
     * The function's ABI element is included for convenience of the client
     * null if ABI is not found for this signature
     */
    abi: utils.Fragment | null;
}
export interface RoleWithBytes extends Role {
    bytes: string;
}
export interface AragonArtifact {
    roles: RoleWithBytes[];
    abi: utils.Fragment[];
    /**
     * All publicly accessible functions
     * Includes metadata needed for radspec and transaction pathing
     * initialize() function should also be included for completeness
     */
    functions: AragonArtifactFunction[];
    /**
     * Functions that are no longer available at `version`
     */
    deprecatedFunctions: {
        [version: string]: AragonArtifactFunction[];
    };
    dependencies: Dependencies[];
    /**
     * The flaten source code of the contracts must be included in
     * any type of release at this path
     */
    flattenedCode: string;
    appId: string;
    appName: string;
}
export interface RepoContent {
    artifact: AragonArtifact;
    manifest: AragonManifest;
    flatCode: string;
}
export interface PublishTaskArguments extends HardhatArguments {
    bump: string;
    ipfsApiUrl?: string;
    contract?: string;
    onlyContent?: boolean;
    skipAppBuild?: boolean;
    skipValidation?: boolean;
    dryRun?: boolean;
    verify?: boolean;
    validateUpload?: boolean;
    constructorArgsParams?: any[];
    constructorArgsPath?: string;
    confirmations?: number;
}
export interface DeployTaskArguments extends HardhatArguments {
    contract: string;
    constructorArgsParams?: any[];
    constructorArgsPath?: string;
    confirmations?: number;
    dryRun?: boolean;
    verify?: boolean;
}
export interface DeploySubtaskArguments extends HardhatArguments {
    contract: string;
    constructorArguments?: any[];
    confirmations?: number;
    dryRun?: boolean;
    verify?: boolean;
}
export declare type DeployContractArguments = {
    contract: string;
    constructorArguments?: any[];
    confirmations?: number;
};
export declare type DeployContractDryRunArguments = {
    contract: string;
    constructorArguments?: any[];
};
export declare type VerifyTaskArguments = {
    contractAddress: string;
    constructorArguments?: any[];
};
export interface AragonAppJson {
    roles: Role[];
    environments: AragonEnvironments;
    path: string;
    dependencies?: {
        appName: string;
        version: string;
        initParam: string;
        state: string;
        requiredPermissions: {
            name: string;
            params: string;
        }[];
    }[];
    /**
     * If the appName is different per network use environments
     * ```ts
     * environments: {
     *   rinkeby: {
     *     appName: "myapp.open.aragonpm.eth"
     *   }
     * }
     * ```
     */
    appName?: string;
}
export interface AragonEnvironments {
    [environmentName: string]: AragonEnvironment;
}
export interface AragonEnvironment {
    network: string;
    registry?: string;
    appName?: string;
    gasPrice?: string;
    wsRPC?: string;
    appId?: string;
}
//# sourceMappingURL=index.d.ts.map