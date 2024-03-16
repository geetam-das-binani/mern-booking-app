import { NextFunction, Request, Response } from "express";
import {  body, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/error";
export const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return next(new ErrorHandler(errors.array(), 400));
};

export const registerValidator = () => [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required")
];

export const loginValidator=()=>[
  body("email")
  .notEmpty()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    
]
