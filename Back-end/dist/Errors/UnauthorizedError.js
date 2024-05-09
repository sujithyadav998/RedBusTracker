"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnauthorizedError extends Error {
    constructor(message = 'Unauthorized') {
        super(message);
        this.name = this.constructor.name;
        // Ensure stack trace is captured
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = UnauthorizedError;
