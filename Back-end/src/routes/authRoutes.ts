import express, {Request, Response} from "express";
import loginController from "../controllers/auth/loginController";
import signinController from "../controllers/auth/signinController";

const router = express.Router();

router
    .route("/login")
    .post(loginController);

router
   .route("/register")
   .post(signinController);


export default router;