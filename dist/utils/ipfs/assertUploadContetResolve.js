"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertUploadContentResolve = void 0;
const apm_1 = require("../apm");
async function assertUploadContentResolve(contentHash, gateway) {
    try {
        await (0, apm_1.resolveRepoContentUri)(`ipfs:${contentHash}`, {
            ipfsGateway: gateway,
        });
    }
    catch (_a) {
        return;
    }
}
exports.assertUploadContentResolve = assertUploadContentResolve;
//# sourceMappingURL=assertUploadContetResolve.js.map