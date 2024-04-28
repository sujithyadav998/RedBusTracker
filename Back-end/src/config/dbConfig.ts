import * as mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * @throws {EnvVariableError} - Thrown if specified environment variable is not found.
 **/
export async function connectDB() {
    if (!process.env.MONGO_DB_URL){
        throw new EnvVariableError("MONGO_DB_URL");
    }

    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to MongoDB");
}
