import { Request, Response, response } from "express";
import { ResponsePayload } from "../../types/types";
import validateEmail from "../../validators/emailValidator";
import validatePassword from "../../validators/passwordValidator";
import { getUser, generateToken } from "../../utils/helper";
/**
 * @param req - Request object
 * @param res - Response object
 */
export default async function loginController(req : Request, res : Response){
    try{
        const {email, password} = req.body;

        // * Check if email and password are provided or not
        if (!email || !password) {
            throw new BadRequestError("email or password must be provided");
        }

        // * Validate the email and password format
        if (!validateEmail(email) || !validatePassword(password)) {
            throw new BadRequestError("Invalid email or password");
        }

        // * See if users exists or not
        const user = await getUser({email});

        
        if (user == null) {
            throw new BadRequestError("Invalid email or password"); 
        }
        if (process.env.SECRET == null) {
            throw new EnvVariableError("SECRET");
        }

        // * If user exists, generate a new token and return it
        const token = generateToken({email: user.email, userId: user.id}, process.env.SECRET, '1d');

        const responseData : ResponsePayload<string> = {
            success: true,
            data: token
        }

        return res.json(responseData);

    }

    catch (err : any) {
        const responseData : ResponsePayload<null> = {
            success: false,
            data: null
        }

        if (err instanceof BadRequestError) {
            responseData.message = err.message;
            res.status(400).json(responseData);
        }
        else{
            console.error(err.message);
            responseData.message = "Internal Server Error"
            res.status(500).json(responseData);
        }
    }

    
}