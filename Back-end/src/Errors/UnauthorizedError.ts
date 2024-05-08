export default class UnauthorizedError extends Error {
    constructor(message: string = 'Unauthorized') {
      super(message);
      this.name = this.constructor.name;
      // Ensure stack trace is captured
      Error.captureStackTrace(this, this.constructor);
    }
  }
  