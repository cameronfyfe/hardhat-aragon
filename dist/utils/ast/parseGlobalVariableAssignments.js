"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGlobalVariableAssignments = void 0;
const parser_1 = require("@solidity-parser/parser");
/**
 * Finds global storage variable declarations with initialized values, e.g 'int a = 1'.
 *
 * @param sourceCode Source code of the contract.
 */
function parseGlobalVariableAssignments(sourceCode) {
    const ast = (0, parser_1.parse)(sourceCode, {});
    const variables = [];
    (0, parser_1.visit)(ast, {
        StateVariableDeclaration: function (node) {
            const variable = node.variables[0];
            if (variable.isStateVar &&
                !variable.isDeclaredConst &&
                variable.expression) {
                variables.push(variable.name);
            }
        },
    });
    return variables;
}
exports.parseGlobalVariableAssignments = parseGlobalVariableAssignments;
//# sourceMappingURL=parseGlobalVariableAssignments.js.map