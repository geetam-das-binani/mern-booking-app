import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../utils/catchAsyncErrors";
import { ErrorHandler } from "../utils/error";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../models/user";

declare global {
  namespace Express {
    interface Request {
      user: typeof mongoose.Schema.Types.ObjectId;
    }
  }
}

export const verifyToken = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth-token"];

    if (!token) {
      return next(
        new ErrorHandler("Please login to access this resource", 401)
      );
    }
    try {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET as string);

      if (!decodedData) {
        return next(new ErrorHandler("Invalid token", 401));
      }
      req.user = (decodedData as JwtPayload).id;
      next();
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 401));
    }
  }
);

export const authorizeRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.user);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  if (!user?.isAdmin) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to access this resource",
    });
  }

  next();
};
