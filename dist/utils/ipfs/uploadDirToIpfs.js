"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDirToIpfs = void 0;
const ipfs_http_client_1 = require("ipfs-http-client");
/**
 * Uploads dist folder to IPFS
 * Applies various ignore patterns:
 * - .ipfsignore
 * - .gitignore
 */
async function uploadDirToIpfs({ dirPath, ipfs, ignore, progress, }) {
    const results = await ipfs.add((0, ipfs_http_client_1.globSource)(dirPath, { recursive: true, ignore }), { progress });
    return results.cid.toString();
}
exports.uploadDirToIpfs = uploadDirToIpfs;
//# sourceMappingURL=uploadDirToIpfs.js.map