"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BadRequestError extends Error {
    constructor(message) {
        super(`400 Bad Request, Reason: ${message}`);
        this.name = "BadRequestError";
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
exports.default = BadRequestError;
