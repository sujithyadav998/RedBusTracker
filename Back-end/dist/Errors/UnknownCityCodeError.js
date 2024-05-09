"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnknownCityCodeError extends Error {
    constructor(city) {
        super(`City Code for: ${city} Not Found`);
        this.name = "UnknownCityCodeError";
        Object.setPrototypeOf(this, UnknownCityCodeError.prototype);
    }
}
exports.default = UnknownCityCodeError;
