import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const mongoUri = process?.env?.MONGO_URI;

export const dbConnect = async () => {
  if (!mongoUri) {
    return Promise.reject(`Please provide DB connection creds!`);
  }

  try {
    const { connection } = await mongoose.connect(`${mongoUri}`);
    if (connection?.readyState === 1) {
      console.log(`DB connected succesfully!`);
      return Promise.resolve(true);
    }
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject(error?.message);
    } else {
      return Promise.reject(`DB connection error!`);
    }
  }
};
