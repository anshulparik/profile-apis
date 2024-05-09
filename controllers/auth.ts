import { createCustomError } from "../errors/customError";
import { User } from "../models/User";
import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, ...other } = req?.body;
    const emailExist = await User.findOne({ email: req?.body?.email });
    if (emailExist) {
      return next(createCustomError("Email is already registered!", 400));
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ password: hashedPassword, ...other });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: req?.body?.email });

    if (!user) {
      return next(createCustomError("Email/Password might be incorrect!", 400));
    }

    // Checking if entered password is correct for a user
    const validPassword = await bcrypt.compare(
      req?.body?.password,
      user?.password
    );

    if (!validPassword) {
      return next(createCustomError("Email/Password might be incorrect!", 400));
    }

    const token = jwt.sign({ _id: user._id }, process?.env?.TOKEN_SECRET || "somesecret");
    res.header("auth-token", token).send(token);
  } catch (error) {
    next(error);
  }
};
