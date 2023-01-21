"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.ensureDir = exports.writeJson = exports.readJsonIfExists = exports.readJson = exports.writeFile = exports.readFileIfExists = exports.readFile = exports.pathExists = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * tests whether or not the given path exists by checking with the file system.
 * @param filepath path
 */
const pathExists = (filepath) => fs_extra_1.default.existsSync(filepath);
exports.pathExists = pathExists;
/**
 * Read file contents as a string (UTF-8)
 * @param filepath path
 */
const readFile = (filepath) => fs_extra_1.default.readFileSync(filepath, 'utf8');
exports.readFile = readFile;
/**
 * Read file contents as string or if the path doesn't exists returns undefined
 * @param filepath path
 */
const readFileIfExists = (filepath) => (0, exports.pathExists)(filepath) ? (0, exports.readFile)(filepath) : undefined;
exports.readFileIfExists = readFileIfExists;
/**
 * Write string data to file
 * @param filepath
 */
const writeFile = (filepath, data) => fs_extra_1.default.writeFileSync(filepath, data);
exports.writeFile = writeFile;
/**
 * Read file contents as JSON
 * @param filepath path
 */
const readJson = (filepath) => fs_extra_1.default.readJsonSync(filepath);
exports.readJson = readJson;
/**
 * Read file contents as JSON or if the path doesn't exists returns undefined
 * @param filepath path
 */
const readJsonIfExists = (filepath) => (0, exports.pathExists)(filepath) ? (0, exports.readJson)(filepath) : undefined;
exports.readJsonIfExists = readJsonIfExists;
/**
 * Write JSON data to file
 * @param filepath path
 * @param data
 */
const writeJson = (filepath, data) => fs_extra_1.default.writeJsonSync(filepath, data);
exports.writeJson = writeJson;
/**
 * If given path does not exists, creates a directory recursively
 * @param filepath path
 */
const ensureDir = (filepath) => fs_extra_1.default.ensureDirSync(filepath);
exports.ensureDir = ensureDir;
/**
 * Removes a file or directory. The directory can have contents.
 * If the path does not exist, silently does nothing. Like rm -rf
 * @param filepath path
 */
const remove = (filepath) => fs_extra_1.default.removeSync(filepath);
exports.remove = remove;
//# sourceMappingURL=fsUtils.js.map