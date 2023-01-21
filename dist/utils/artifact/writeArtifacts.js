"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeArtifacts = void 0;
const path_1 = __importDefault(require("path"));
const constants_1 = require("../../constants");
const fsUtils_1 = require("../fsUtils");
function writeArtifacts(outPath, content) {
    (0, fsUtils_1.ensureDir)(outPath);
    (0, fsUtils_1.writeJson)(path_1.default.join(outPath, constants_1.ARTIFACT_NAME), content.artifact);
    (0, fsUtils_1.writeJson)(path_1.default.join(outPath, constants_1.MANIFEST_NAME), content.manifest);
    (0, fsUtils_1.writeFile)(path_1.default.join(outPath, constants_1.FLAT_CODE_NAME), content.flatCode);
}
exports.writeArtifacts = writeArtifacts;
//# sourceMappingURL=writeArtifacts.js.map