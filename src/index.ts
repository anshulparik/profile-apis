import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { dbConnect } from "../db/db";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    await dbConnect();
    app.listen(port, async () => {
      console.log(`Server is runnning on port ${port}!`);
    });
  } catch (error) {
    console.log(error);
    process?.exit(1);
  }
};

startServer();
