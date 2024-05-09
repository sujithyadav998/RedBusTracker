"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.getUser = exports.formatDate = exports.readJsonFile = exports.getCityCode = exports.generateURL = void 0;
const dotenv = __importStar(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const EnvVariableError_1 = __importDefault(require("../Errors/EnvVariableError"));
const fs_1 = __importDefault(require("fs"));
dotenv.config();
/**
 * @param {string} fromCity - The source city.
 * @param {string} toCity - The destination city.
 * @param {Date} date - The date for booking tickets.
 * @throws {EnvVariableError} - Thrown if specified environment variable is not found.
 * @throws {UnknownCityCodeError} - Thrown if specified city code is not found.
 * @returns {string} The URL to fetch the required data.
 */
const generateURL = (fromCity, toCity, date) => {
    if (!process.env.SEARCH_DOMAIN_URL) {
        throw new EnvVariableError_1.default("SEARCH_DOMAIN_URL");
    }
    // ?fromCity=124&toCity=122&DOJ=27-Apr-2024
    let searchParams = `?fromCity=${(0, exports.getCityCode)(fromCity)}&toCity=${(0, exports.getCityCode)(toCity)}&DOJ=${(0, exports.formatDate)(date)}`;
    return process.env.SEARCH_DOMAIN_URL + searchParams;
};
exports.generateURL = generateURL;
/**
 * @param {string} city - The name of the city.
 * @throws {UnknownCityCodeError} - Thrown if specified City code is not found.
 * @returns {Number} - The city code.
 */
const getCityCode = (city) => {
    return 0;
};
exports.getCityCode = getCityCode;
/**
 * @param {string} filePath - path of the file to read
 * @returns {Promise<any>} - Promise resolved when data is in json format else rejected
*/
const readJsonFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            }
            try {
                const jsonData = JSON.parse(data.toString());
                resolve(jsonData);
            }
            catch (err) {
                reject(err);
            }
        });
    });
};
exports.readJsonFile = readJsonFile;
/**
 * @param {Date} date - The date for booking tickets.
 * @returns {string} - The formatted date.
 */
const formatDate = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
exports.formatDate = formatDate;
const getUser = async (filter) => {
    const user = await User_1.default.findOne(filter);
    return user;
};
exports.getUser = getUser;
const generateToken = (payload, secretKey, expiresIn) => {
    const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn });
    return token;
};
exports.generateToken = generateToken;
