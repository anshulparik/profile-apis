import { json } from "stream/consumers";
import { CustomError } from "../errors/customError";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err?.statusCode && err?.message) {
    return res.status(400).json({ msg: err?.message });
  }
  if (err instanceof CustomError) {
    return res.status(err?.statusCode).json({ msg: err?.message });
  }
  return res
    .status(500)
    .json({ msg: "Something went wrong please try again later!" });
};
