import { createCustomError } from "../errors/customError";
import { User } from "../models/User";
import { NextFunction, Request, Response } from "express";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.params?.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(createCustomError(`No user with id: ${userId}`, 404));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, ...other } = req?.body;
    const user = await User.create(req?.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.params?.id;
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return next(createCustomError(`No user with id: ${userId}`, 404));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.params?.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return next(createCustomError(`No user with id: ${userId}`, 404));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
