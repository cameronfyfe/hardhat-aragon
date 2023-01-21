"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasConstructor = void 0;
const parser_1 = require("@solidity-parser/parser");
/**
 * Returns true if a contract has a constructor, otherwise false.
 *
 * @param sourceCode Source code of the contract.
 */
function hasConstructor(sourceCode) {
    const ast = (0, parser_1.parse)(sourceCode, {});
    let foundConstructor = false;
    (0, parser_1.visit)(ast, {
        FunctionDefinition: function (node) {
            if (!node.isConstructor)
                return;
            foundConstructor = true;
        },
    });
    return foundConstructor;
}
exports.hasConstructor = hasConstructor;
//# sourceMappingURL=parseContructor.js.map