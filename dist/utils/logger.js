"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const chalk_1 = __importDefault(require("chalk"));
let logTag = chalk_1.default.gray('aragon | ');
function _prependTag(lines, tag, color) {
    if (color)
        tag = chalk_1.default[color](tag);
    return lines
        .split('\n')
        .map((line) => tag + line)
        .join('\n');
}
function log(data) {
    // eslint-disable-next-line no-console
    console.log(_prependTag(data, logTag));
}
exports.log = log;
//# sourceMappingURL=logger.js.map