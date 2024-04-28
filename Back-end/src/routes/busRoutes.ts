import express, {Request, Response} from "express";
import { getBusDetails } from "../controllers/api/BusControllers/busController";

const router = express.Router();

router
    .route("/getAllBusDetails")
    .post(getBusDetails);


export default router;