import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../utils/catchAsyncErrors";
import { ErrorHandler } from "../utils/error";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";


// ! Register a user
const registerHandler = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new ErrorHandler("user already exists", 400));
    }

    const newUser = await User.create(req.body);

    const token = jwt.sign(
      { id: newUser._id  },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    const userWithoutPassword = await User.findById(newUser._id).select(
      "-password"
    );
    res
      .status(201)
      .cookie("auth-token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "Registration Successful",
        userWithoutPassword,
      });
  }
);

// ! Login a user
const loginHandler = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      return next(new ErrorHandler("Invalid credentials", 400));
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid credentials", 400));
    }

    const userWithoutPassword = await User.findById(existingUser._id).select(
      "-password"
    );
    const token = jwt.sign(
      { id: userWithoutPassword!._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    res
      .status(201)
      .cookie("auth-token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: `Sign In Successful`,
        userWithoutPassword,
      });
  }
);

const logoutHandler = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    return res
      .status(200)
      .cookie("auth-token", "", {
        maxAge: 0,
      })
      .json({
        message: "Logged out successfully",
      });
  }
);
//  ! Get profile of logged user
const getProfileDetails = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const existingUserWithoutPassword = await User.findById(req.user);
    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      userWithoutPassword: existingUserWithoutPassword,
    });
  }
);
export { registerHandler, loginHandler, logoutHandler, getProfileDetails };
