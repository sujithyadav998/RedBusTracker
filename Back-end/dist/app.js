"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const busController_1 = require("./controllers/busController");
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.get('/api/v1/getBusDetails', busController_1.getBusDetails);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});