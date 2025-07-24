import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
async function connect() {
    mongoose.set('strictQuery',true);
    const dbUri = process.env.DB_URI;
    if (!dbUri) {
        throw new Error("DB_URI is not defined in the .env file.");
    }
    
    const db = await mongoose.connect(dbUri);
    console.log("Database Connected Successfully");
    return db;
}
export default connect;