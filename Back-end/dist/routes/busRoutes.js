"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const busController_1 = require("../controllers/api/Bus/busController");
const router = express_1.default.Router();
// TODO: Add only user middleware
router
    .route("/getAllBusDetails")
    .post(busController_1.getBusDetails);
router
    .route("/getCityCodes")
    .get(busController_1.getCityCodes);
exports.default = router;
