"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AragonPluginError = void 0;
const plugins_1 = require("hardhat/plugins");
class AragonPluginError extends plugins_1.HardhatPluginError {
    constructor(message, parent) {
        super('hardhat-aragon', message, parent);
    }
}
exports.AragonPluginError = AragonPluginError;
//# sourceMappingURL=errors.js.map