"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnvVariableError extends Error {
    constructor(variableName) {
        super(`Environment Variable ${variableName} is not defined`);
        this.name = "EnvVariableError";
        Object.setPrototypeOf(this, EnvVariableError.prototype);
    }
}
exports.default = EnvVariableError;
