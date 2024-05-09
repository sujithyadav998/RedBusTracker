"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emailValidator_1 = __importDefault(require("../../validators/emailValidator"));
const passwordValidator_1 = __importDefault(require("../../validators/passwordValidator"));
const helper_1 = require("../../utils/helper");
const User_1 = __importDefault(require("../../models/User"));
const BadRequestError_1 = __importDefault(require("../../Errors/BadRequestError"));
const EnvVariableError_1 = __importDefault(require("../../Errors/EnvVariableError"));
const UnauthorizedError_1 = __importDefault(require("../../Errors/UnauthorizedError"));
/**
 * @param req - Request object
 * @param res - Response object
 * @returns - Response object with Jwt token on sucess else returns Response error object
 */
async function signinController(req, res) {
    try {
        const { email, password, fullName } = req.body;
        if (!email || !password || !fullName) {
            throw new BadRequestError_1.default("Email or password or Name must be provided");
        }
        // * Validate the email and password format
        if (!(0, emailValidator_1.default)(email) || !(0, passwordValidator_1.default)(password)) {
            throw new BadRequestError_1.default("Invalid email or password or Name");
        }
        // * See if users exists or not
        let user = await (0, helper_1.getUser)({ email });
        // * User already exists, return unauthorized
        if (user != null) {
            throw new UnauthorizedError_1.default("Unauthorized: User already exists");
        }
        if (process.env.SECRET == null) {
            throw new EnvVariableError_1.default("SECRET");
        }
        // * Create a new user
        user = await User_1.default.create({ email, fullName, password });
        const token = (0, helper_1.generateToken)({
            userId: user.id,
            email: user.email
        }, process.env.SECRET, '1d');
        const responseData = {
            success: true,
            data: token
        };
        res.status(200).json(responseData);
    }
    catch (err) {
        const responseData = {
            success: false,
            data: null
        };
        if (err instanceof UnauthorizedError_1.default) {
            responseData.message = err.message;
            res.status(401).json(responseData);
        }
        else if (err instanceof BadRequestError_1.default) {
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
exports.default = signinController;
