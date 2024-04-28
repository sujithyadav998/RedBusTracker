class EnvVariableError extends Error {
    constructor(variableName: string) {
        super(`Environment Variable ${variableName} is not defined`);
        this.name = "EnvVariableError";
        Object.setPrototypeOf(this, EnvVariableError.prototype);
    }
}