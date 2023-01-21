import 'hardhat/types/config';
import 'hardhat/types/runtime';
import { AragonConfig, AragonUserConfig, IpfsConfig, IpfsUserConfig } from '.';
declare module 'hardhat/types/config' {
    interface HardhatUserConfig {
        ipfs?: IpfsUserConfig;
        aragon: AragonUserConfig;
    }
    interface HardhatConfig {
        ipfs: IpfsConfig;
        aragon: AragonConfig;
        etherscan: any;
    }
    interface HardhatNetworkUserConfig {
        appEnsName?: string;
        ensRegistry?: string;
    }
    interface HttpNetworkUserConfig {
        appEnsName?: string;
        ensRegistry?: string;
    }
    interface HardhatNetworkConfig {
        appEnsName?: string;
        ensRegistry?: string;
    }
    interface HttpNetworkConfig {
        appEnsName?: string;
        ensRegistry?: string;
    }
}
declare module 'hardhat/types/runtime' {
    interface HardhatRuntimeEnvironment {
        ipfs: any;
        ethers: any;
    }
}
//# sourceMappingURL=type-extensions.d.ts.map