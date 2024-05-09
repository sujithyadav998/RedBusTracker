"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginController_1 = __importDefault(require("../controllers/auth/loginController"));
const signinController_1 = __importDefault(require("../controllers/auth/signinController"));
const router = express_1.default.Router();
router
    .route("/register")
    .post(signinController_1.default);
router
    .route("/login")
    .post(loginController_1.default);
exports.default = router;
