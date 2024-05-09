import {Request, Response} from 'express';
import { ResponsePayload } from '../../../types/types';
import BusService from '../../../services/BusService';
import BadRequestError from '../../../Errors/BadRequestError';
import { isValidDate } from '../../../utils/helper';

export const getCityCodes = async (req : Request, res : Response) => {
    try {
        const busService = BusService.getInstance();
        const cityCodes = await busService.getCityCodes();
        const responsePayload : ResponsePayload<Object> = {
            success: true,
            data: { cityCodes }
        }
        res.status(200).json(responsePayload);
    }
    catch (err) {
        console.log(err);
        const responsePayload : ResponsePayload<null> = {
            success: false,
            data: null,
            message: "Internal Server Error"
        }
        res.status(500).json(responsePayload);
    }
}

export const getBusDetails = async (req : Request, res : Response) => {
    try{
        const {fromCity, toCity, date} = req.body.payload;
        const busService = BusService.getInstance();
        if (!await busService.isValidCity(fromCity) || !await busService.isValidCity(toCity)) {
            throw new BadRequestError("Invalid city code");
        }
        if (!isValidDate(date)) {
            throw new BadRequestError("Invalid date");
        }
        const busDetails = await busService.getBusDetails(await busService.getCodeFromCity(fromCity), await busService.getCodeFromCity(toCity), new Date(date));
        const responsePayload : ResponsePayload<Object> = {
            success : true,
            data : { busDetails }
        }
        res.status(200).json(responsePayload);
    } catch (err) {
        const responsePayload : ResponsePayload<null> = {
            success : false,
            data : null,
            message : "Internal Server Error"
        }
        if (err instanceof BadRequestError) {
            responsePayload.message = err.message;
            res.status(400).json(responsePayload);
        }
        else{
            console.error("Internal Server Error");
            console.error(err);
            res.status(500).json(responsePayload);
        }
    }
    
}

export const scheduleTask = async (req : Request, res : Response) => {

}