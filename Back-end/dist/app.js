"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const busRoutes_1 = __importDefault(require("./routes/busRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/auth', authRoutes_1.default);
app.use('/api/v1/bus', busRoutes_1.default);
app.use('/api/v1/user', userRoutes_1.default);
app.use("*", (req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});
exports.default = app;
