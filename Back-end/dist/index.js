"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dbConfig_1 = require("./config/dbConfig");
async function main() {
    try {
        await (0, dbConfig_1.connectDB)();
        const PORT = process.env.PORT || 3000;
        app_1.default.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}
main();
