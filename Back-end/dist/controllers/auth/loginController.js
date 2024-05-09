"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emailValidator_1 = __importDefault(require("../../validators/emailValidator"));
const passwordValidator_1 = __importDefault(require("../../validators/passwordValidator"));
const helper_1 = require("../../utils/helper");
const BadRequestError_1 = __importDefault(require("../../Errors/BadRequestError"));
const EnvVariableError_1 = __importDefault(require("../../Errors/EnvVariableError"));
/**
 * @param req - Request object
 * @param res - Response object
 */
async function loginController(req, res) {
    try {
        const { email, password } = req.body;
        // * Check if email and password are provided or not
        if (!email || !password) {
            throw new BadRequestError_1.default("email or password must be provided");
        }
        // * Validate the email and password format
        if (!(0, emailValidator_1.default)(email) || !(0, passwordValidator_1.default)(password)) {
            throw new BadRequestError_1.default("Invalid email or password");
        }
        // * See if users exists or not
        const user = await (0, helper_1.getUser)({ email });
        if (user == null) {
            throw new BadRequestError_1.default("Invalid email or password");
        }
        if (process.env.SECRET == null) {
            throw new EnvVariableError_1.default("SECRET");
        }
        // * If user exists, generate a new token and return it
        const token = (0, helper_1.generateToken)({ email: user.email, userId: user.id }, process.env.SECRET, '1d');
        const responseData = {
            success: true,
            data: token
        };
        return res.json(responseData);
    }
    catch (err) {
        const responseData = {
            success: false,
            data: null
        };
        if (err instanceof BadRequestError_1.default) {
            responseData.message = err.message;
            res.status(400).json(responseData);
        }
        else {
            console.error(err.message);
            responseData.message = "Internal Server Error";
            res.status(500).json(responseData);
        }
    }
}
exports.default = loginController;
