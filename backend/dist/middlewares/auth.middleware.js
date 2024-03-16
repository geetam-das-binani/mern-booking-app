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
exports.verifyToken = void 0;
const catchAsyncErrors_1 = require("../utils/catchAsyncErrors");
const error_1 = require("../utils/error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.verifyToken = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies["auth-token"];
    if (!token) {
        return next(new error_1.ErrorHandler("Please login to access this resource", 401));
    }
    try {
        const decodedData = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decodedData) {
            return next(new error_1.ErrorHandler("Invalid token", 401));
        }
        req.user = decodedData.id;
        next();
    }
    catch (error) {
        return next(new error_1.ErrorHandler(error.message, 401));
    }
}));
