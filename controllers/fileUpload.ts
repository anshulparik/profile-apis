import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import { createCustomError } from "../errors/customError";

export const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload",
  upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return next(createCustomError("No file uploaded!", 400));
      }

      res.status(200).send("File uploaded successfully!");
    } catch (error) {
      next(error);
    }
  }
);
