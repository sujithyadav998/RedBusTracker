import express from "express";
import { getBusDetails, getCityCodes, scheduleTask } from "../controllers/api/Bus/busController";

const router = express.Router();

// TODO: Add only user middleware

router
    .route("/getAllBusDetails")
    .post(getBusDetails);

router
    .route("/getCityCodes")
    .get(getCityCodes);

router
    .route("/schedule")
    .post(scheduleTask);


export default router;