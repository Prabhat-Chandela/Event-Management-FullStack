import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDb connected !! DB Host : ${connectionInstance.connections[0].host}`)

    } catch (error) {
        console.log("MongoDb Connection Failed", error);
        process.exit(1);
    }
}

export {connectDb}