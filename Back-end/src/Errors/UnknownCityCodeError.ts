export default class UnknownCityCodeError extends Error {
    constructor(city: string) {
        super(`City Code for: ${city} Not Found`);
        this.name = "UnknownCityCodeError";
        Object.setPrototypeOf(this, UnknownCityCodeError.prototype);
    }
}