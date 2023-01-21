"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateArtifacts = void 0;
const path_1 = __importDefault(require("path"));
const errors_1 = require("../../errors");
const constants_1 = require("../../constants");
const ast_1 = require("../ast");
const fsUtils_1 = require("../fsUtils");
const findMissingManifestFiles_1 = require("./findMissingManifestFiles");
const matchContractRoles_1 = require("./matchContractRoles");
/**
 * Validates a release directory. Throws if there are issues
 * - Make sure contract roles match arapp.json roles
 * - Make sure filepaths in the manifest exist
 */
function validateArtifacts(distPath, appContractName, hasFrontend) {
    // Load files straight from the dist directory
    const artifact = (0, fsUtils_1.readJson)(path_1.default.join(distPath, constants_1.ARTIFACT_NAME));
    const manifest = (0, fsUtils_1.readJson)(path_1.default.join(distPath, constants_1.MANIFEST_NAME));
    const flatCode = (0, fsUtils_1.readFile)(path_1.default.join(distPath, constants_1.FLAT_CODE_NAME));
    const functions = (0, ast_1.parseContractFunctions)(flatCode, appContractName);
    // Make sure all declared files in the manifest are there
    const missingFiles = (0, findMissingManifestFiles_1.findMissingManifestFiles)(manifest, distPath, hasFrontend);
    if (missingFiles.length)
        throw new errors_1.AragonPluginError(`
Some files declared in manifest.json are not found in dist dir: ${distPath}
${missingFiles.map((file) => ` - ${file.id}: ${file.path}`).join('\n')}
      
Make sure your app build process includes them in the dist directory on
every run of the designated NPM build script.

If you are sure you want to publish anyway, use the flag "--skip-validation".
`);
    // Make sure that the roles in the contract match the ones in arapp.json
    const roleMatchErrors = (0, matchContractRoles_1.matchContractRoles)(functions, artifact.roles);
    if (roleMatchErrors.length)
        throw new errors_1.AragonPluginError(`
Some contract roles do not match declared roles in arapp.json:
${roleMatchErrors.map((err) => ` - ${err.id}: ${err.message}`).join('\n')}

If you are sure you want to publish anyway, use the flag "--skip-validation".
`);
}
exports.validateArtifacts = validateArtifacts;
//# sourceMappingURL=validateArtifacts.js.map