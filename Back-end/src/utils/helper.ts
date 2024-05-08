import * as dotenv from "dotenv";
import User from "../models/User";
import { SessionPayload } from "../types/types";
import jwt from "jsonwebtoken";
import EnvVariableError from "../Errors/EnvVariableError";
dotenv.config();

/**
 * @param {string} fromCity - The source city.
 * @param {string} toCity - The destination city.
 * @param {Date} date - The date for booking tickets.
 * @throws {EnvVariableError} - Thrown if specified environment variable is not found.
 * @throws {UnknownCityCodeError} - Thrown if specified city code is not found.
 * @returns {string} The URL to fetch the required data.
 */
export const generateURL = (fromCity: string, toCity: string, date : Date): string | undefined => {
    if (!process.env.SEARCH_DOMAIN_URL){
        throw new EnvVariableError("SEARCH_DOMAIN_URL");
    }
    // ?fromCity=124&toCity=122&DOJ=27-Apr-2024
    let searchParams = `?fromCity=${getCityCode(fromCity)}&toCity=${getCityCode(toCity)}&DOJ=${formatDate(date)}`;
    return process.env.SEARCH_DOMAIN_URL + searchParams;
}

/**
 * @param {string} city - The name of the city.
 * @throws {UnknownCityCodeError} - Thrown if specified City code is not found.
 * @returns {Number} - The city code.
 */
export const getCityCode = (city: string) : Number => {
    return 0;
}


/**
 * @param {Date} date - The date for booking tickets.
 * @returns {string} - The formatted date.
 */
export const formatDate = (date : Date) : string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

export const getUser = async (filter : {email ?: string, password?:string}) => {
    const user = await User.findOne(filter);
    return user;
}

export const generateToken = (payload : SessionPayload, secretKey : string, expiresIn : string) => {
    const token = jwt.sign(payload, secretKey, {expiresIn});
    return token;
}

