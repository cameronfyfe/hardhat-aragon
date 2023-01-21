"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.namehash = void 0;
const ethers_1 = require("ethers");
/**
 * Returns the ENS namehash of a domain
 * @param name
 */
const namehash = (name) => ethers_1.utils.namehash(name);
exports.namehash = namehash;
//# sourceMappingURL=namehash.js.map