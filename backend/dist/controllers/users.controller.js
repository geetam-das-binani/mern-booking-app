"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileDetails = exports.logoutHandler = exports.loginHandler = exports.registerHandler = void 0;
const catchAsyncErrors_1 = require("../utils/catchAsyncErrors");
const error_1 = require("../utils/error");
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// ! Register a user
const registerHandler = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_1.User.findOne({ email: req.body.email });
    if (user) {
        return next(new error_1.ErrorHandler("user already exists", 400));
    }
    const newUser = yield user_1.User.create(req.body);
    const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const userWithoutPassword = yield user_1.User.findOne({ _id: newUser._id }).select("-password");
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
}));
exports.registerHandler = registerHandler;
// ! Login a user
const loginHandler = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingUser = yield user_1.User.findOne({ email }).select("+password");
    if (!existingUser) {
        return next(new error_1.ErrorHandler("Invalid credentials", 400));
    }
    const isMatch = yield bcryptjs_1.default.compare(password, existingUser.password);
    if (!isMatch) {
        return next(new error_1.ErrorHandler("Invalid credentials", 400));
    }
    const userWithoutPassword = yield user_1.User.findOne({
        _id: existingUser._id,
    }).select("-password");
    const token = jsonwebtoken_1.default.sign({ id: userWithoutPassword._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
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
        message: `Welcome back ${userWithoutPassword === null || userWithoutPassword === void 0 ? void 0 : userWithoutPassword.firstName}`,
        userWithoutPassword,
    });
}));
exports.loginHandler = loginHandler;
const logoutHandler = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).cookie("auth-token", "", {
        maxAge: 0
    }).json({
        message: "Logged out successfully"
    });
}));
exports.logoutHandler = logoutHandler;
//  ! Get profile of logged user
const getProfileDetails = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUserWithoutPassword = yield user_1.User.findById(req.user);
    return res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        userWithoutPassword: existingUserWithoutPassword,
    });
}));
exports.getProfileDetails = getProfileDetails;
