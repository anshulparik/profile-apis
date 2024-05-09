const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import { createCustomError } from "../errors/customError";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");
  if (!token) {
    return next(createCustomError("Access denied!", 401));
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return next(createCustomError("Invalid token!", 401));
  }
};

