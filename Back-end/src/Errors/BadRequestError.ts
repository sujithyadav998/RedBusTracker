class BadRequestError extends Error {
    constructor(message: string) {
        super(`400 Bad Request, Reason: ${message}`);
        this.name = "BadRequestError";
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}