import express from "express";
import loginController from "../controllers/auth/loginController";
import signinController from "../controllers/auth/signinController";

const router = express.Router();

router
   .route("/register")
   .post(signinController);

router
    .route("/login")
    .post(loginController);



export default router;