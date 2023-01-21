"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TASK_VERIFY_CONTRACT = exports.TASK_GET_CONSTRUCTOR_ARGS = exports.TASK_DEPLOY_SUBTASK = exports.TASK_DEPLOY = exports.TASK_COMPILE_CONTRACT = exports.TASK_PUBLISH = void 0;
// Aragon plugin tasks
exports.TASK_PUBLISH = 'publish';
exports.TASK_COMPILE_CONTRACT = 'compile';
// task to deploy a contract
exports.TASK_DEPLOY = 'deploy';
// subtask to deploy a contract
exports.TASK_DEPLOY_SUBTASK = 'deploy:deploy-subtask';
// Following are subtasks from hardhat-etherscan
// subtask to get constructor arguments
exports.TASK_GET_CONSTRUCTOR_ARGS = 'verify:get-constructor-arguments';
// subtask to verify contract subtask
exports.TASK_VERIFY_CONTRACT = 'verify:verify';
//# sourceMappingURL=task-names.js.map