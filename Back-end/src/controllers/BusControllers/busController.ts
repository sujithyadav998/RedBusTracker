import express, {Request, Response} from 'express';
import { generateURL } from '../../utils/helper';

export const getBusDetails = async (req : Request, res : Response) => {
    const filters = req.body.filters;
    
    
}