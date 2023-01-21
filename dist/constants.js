"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPLORER_CHAIN_URLS = exports.ANY_ADDRESS = exports.FLAT_CODE_NAME = exports.MANIFEST_NAME = exports.ARTIFACT_NAME = exports.DEFAULT_CONFIRMATIONS = exports.DEFAULT_IGNORE_PATH = exports.DEFAULT_APP_BUILD_SCRIPT = exports.DEFAULT_APP_BUILD_PATH = exports.DEFAULT_APP_SRC_PATH = exports.DEFAULT_IPFS_GATEWAY = exports.DEFAULT_IPFS_API_ENDPOINT = void 0;
exports.DEFAULT_IPFS_API_ENDPOINT = 'http://localhost:5001/';
exports.DEFAULT_IPFS_GATEWAY = 'https://ipfs.io/';
exports.DEFAULT_APP_SRC_PATH = 'app/';
exports.DEFAULT_APP_BUILD_PATH = 'dist/';
exports.DEFAULT_APP_BUILD_SCRIPT = 'build';
exports.DEFAULT_IGNORE_PATH = '.';
exports.DEFAULT_CONFIRMATIONS = 1;
// Standard expected Aragon file paths
exports.ARTIFACT_NAME = 'artifact.json';
exports.MANIFEST_NAME = 'manifest.json';
exports.FLAT_CODE_NAME = 'code.sol';
// Special addresses used for permissions
exports.ANY_ADDRESS = '0xffffffffffffffffffffffffffffffffffffffff';
/**
 * Root etherscan URLs per chainId
 * Note: All URLs are expected to have the same sub paths, /tx, etc
 */
exports.EXPLORER_CHAIN_URLS = {
    1: 'https://etherscan.io/',
    3: 'https://ropsten.etherscan.io/',
    4: 'https://rinkeby.etherscan.io/',
    5: 'https://goerli.etherscan.io/',
    42: 'https://kovan.etherscan.io/',
    100: 'https://blockscout.com/xdai/mainnet/',
    137: 'https://polygonscan.com/',
    80001: 'https://mumbai.polygonscan.com/',
    56: 'https://bscscan.com/',
};
//# sourceMappingURL=constants.js.map