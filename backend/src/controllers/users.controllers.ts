import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../utils/catchAsyncErrors";
import { ErrorHandler } from "../utils/error";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import hotel from "../models/hotel";

// ! Register a user
const registerHandler = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new ErrorHandler("user already exists", 400));
    }

    const photo = req.file as Express.Multer.File;
    if(!photo){
      return next(new ErrorHandler("Please upload a photo", 400));
    }

    const b64 = Buffer.from(photo.buffer).toString("base64");
    let dataURI = `data:${photo.mimetype};base64,${b64}`;
    const cloudinaryRes = await cloudinary.uploader.upload(dataURI, {
      folder: "hotelapp",
    });
    req.body.avatar = cloudinaryRes.secure_url;
    const newUser = await User.create(req.body);

    const token = jwt.sign(
      { id: newUser._id },
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
    console.log("sdhg");
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
      .status(200)
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

const updateHandler = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    // ! if user has selected new avatar upload it to cloudinary
    const photo = req.file as Express.Multer.File;
    if (photo) {
      const b64 = Buffer.from(photo.buffer).toString("base64");
      let dataURI = `data:${photo.mimetype};base64,${b64}`;
      const res = await cloudinary.uploader.upload(dataURI, {
        folder: "hotelapp",
      });
      req.body.avatar = res.secure_url;
    }
    const user = await User.findByIdAndUpdate(
      req.user.toString(),
      {
        $set: req.body,
      },
      { new: true }
    ).select("-password");
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      userWithoutPassword: user,
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

const getAllUsers = catchAsyncErrors(async (req: Request, res: Response) => {
  const users = await User.where({
    isAdmin: false,
    _id: { $ne: process.env.ADMIN_ID },
  }).select("-isAdmin");
  console.log(users);
  
  res.json(users);
});

const deleteUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id as string;
    if (!userId) {
      return next(new ErrorHandler("User not found", 404));
    }
    const user = await User.findByIdAndDelete(userId);
  
    
    if (!user?._id) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  }
);
 

export {
  registerHandler,
  loginHandler,
  logoutHandler,
  getProfileDetails,
  updateHandler,
  getAllUsers,
  deleteUser,
 
};
