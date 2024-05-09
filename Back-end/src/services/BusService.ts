import { formatDate, readJsonFile } from "../utils/helper";
import fs from 'fs';
import * as path from "path";
import UnknownCityCodeError from "../Errors/UnknownCityCodeError";
import EnvVariableError from "../Errors/EnvVariableError";

export default class BusService {
    private constructor() {}

    private static instance : BusService;

    private _cityCodes : {[key : string] : number} = {};
    
    /**
     * @function
     * Used to get the instance of the bus service which is used throughout the application
    */
    static getInstance(): BusService {
        if (!BusService.instance) {
            BusService.instance = new BusService();
        }
        return BusService.instance;
    }
    
    async getCityCodes() {
        if (Object.keys(this._cityCodes).length === 0) {
            try{
                const data : { [key: string]: number } = await readJsonFile(path.join(__dirname, "../constants", "CityCodes.json"));
                this._cityCodes = data;
            } catch (err) {
                this._cityCodes = await this._fetchCityCodes();
            }
        }
        return this._cityCodes;
    }

    /**
     * @function
     * Used to get the city codes for the specified city
     * @param {string} city - City Name
     * @return {number} - City Code
     * @throws {UnknownCityCodeError} - Invalid City Code
    */
    async getCodeFromCity(city: string) : Promise<number> {
    
        if (Object.keys(this._cityCodes).length === 0) {
            this._cityCodes = await this._fetchCityCodes();
        }
        if (this._cityCodes[city] === undefined) {
            throw new UnknownCityCodeError(city);
        }
        return this._cityCodes[city];
    }

    async getBusDetails(fromCityCode : number, toCityCode : number, date : Date) {
        const url = this._generateURL(fromCityCode, toCityCode, date);
        if (url === undefined) {
            throw new Error("Error in getBusDetails");
        }
        const response = await fetch(url, {
            headers : {
                'accept' : "application/json, text/plain, */*",
                'content-type' : 'application/json'
            },
            method: "POST"
        });
        const data = await response.json();
        return data;
    }

    async isValidCity(city: string): Promise<boolean> {
        if (Object.keys(this._cityCodes).length === 0) {
            await this.getCityCodes();
        }
        return this._cityCodes[city]!== undefined;
    }

    /**
     * @param {number} fromCityCode - The source city.
     * @param {number} toCityCode - The destination city.
     * @param {Date} date - The date for booking tickets.
     * @throws {EnvVariableError} - Thrown if specified environment variable is not found.
     * @returns {string | undefined} The URL to fetch the required data.
     */
    private _generateURL = (fromCityCode: number, toCityCode: number, date : Date): string | undefined => {
        if (!process.env.SEARCH_DOMAIN_URL){
            throw new EnvVariableError("SEARCH_DOMAIN_URL");
        }
        // ?fromCity=124&toCity=122&DOJ=27-Apr-2024
        let searchParams = `?fromCity=${fromCityCode}&toCity=${toCityCode}&DOJ=${formatDate(date)}`;
        return process.env.SEARCH_DOMAIN_URL + searchParams;
    }

    /**
     * @function
     * Used to fetch the city Codes and store them in CityCodes file in constants
    */
    private async _fetchCityCodes() {
        const codes : {[key : string] : number} = {};
        const date = formatDate(new Date());
        try{
            for(let i = 1; i < 1000; i++){
                let url = `https://www.redbus.in/search/SearchV4Results?fromCity=0&toCity=${i}&DOJ=${date}`
                const response = await fetch(url, {
                    headers : {
                        'accept' : "application/json, text/plain, */*",
                        "content-type" : "application/json"
                    },
                    method: "POST"
                });

                const details = await response.json();
                if (details && details.parentDstCityName !== null) {
                    const key : string = details.parentDstCityName;
                    codes[key] = i;
                }
            }
            await new Promise<any>((resolve, reject) => {
                fs.writeFile(path.join(__dirname, '../constants', 'CityCodes.json'), JSON.stringify(codes), (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(codes);
                })
            });
        } catch (err) {
            console.error(err);
        }
        finally {
            return codes;
        }
    }
    
    
}