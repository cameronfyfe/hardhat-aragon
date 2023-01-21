"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertIpfsApiIsAvailable = void 0;
const errors_1 = require("../../errors");
const ipfs_http_client_1 = require("ipfs-http-client");
/**
 * Sanity check to check if an IPFS API is active
 * Note: It requires the API to /api/v0/version route available
 */
async function assertIpfsApiIsAvailable(urlArg) {
    if (!urlArg) {
        throw new errors_1.AragonPluginError('Missing mandatory ipfs-api-url argument value');
    }
    let url;
    try {
        url = new URL(urlArg);
    }
    catch (e) {
        throw new errors_1.AragonPluginError(`Invalid IPFS URL: ${urlArg}
The IPFS URL must be of the following format: http(s)://host[:port]/[path]`);
    }
    try {
        const ipfs = (0, ipfs_http_client_1.create)(url);
        await ipfs.version();
        return ipfs;
    }
    catch (e) {
        throw new errors_1.AragonPluginError(`IPFS API at ${url} is not available. Error: ${e}`);
    }
}
exports.assertIpfsApiIsAvailable = assertIpfsApiIsAvailable;
//# sourceMappingURL=assertIpfsApiIsAvailable.js.map