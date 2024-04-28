import { Request, Response } from "express";

/**
 * @param req - Request object
 * @param res - Response object
 */
export default async function loginController(req : Request, res : Response){
    try{
        const {username, password} = req.body;
        if (!username || !password) {
            throw new BadRequestError("Username or password must be provided");
        }


    }

    catch (err) {
        if (err instanceof BadRequestError) {
            res.status(400).send(err.message);
        }
    }

    
}