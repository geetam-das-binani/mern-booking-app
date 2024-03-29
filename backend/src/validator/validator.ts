import { NextFunction, Request, Response } from "express";
import { ValidationChain, body, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/error";

export const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  console.log(errors);
  

  return next(
    new ErrorHandler(
      errors
        .array()
        .map((e) => e.msg)
        .join(", "),
      400
    )
  );
};

export const registerValidator = (): ValidationChain[] => [
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
  body("lastName").notEmpty().withMessage("Last name is required"),
];

export const loginValidator = (): ValidationChain[] => [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const hotelValidator = (): ValidationChain[] => [
  body("name").notEmpty().withMessage("Name is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("desc").notEmpty().withMessage("Description is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("type").notEmpty().withMessage("Hotel Type is required"),
  body("pricePerNight")
    .notEmpty()

    .withMessage("Price per night is required"),
  body("facilities")
    .notEmpty()
    .isArray()
    .isLength({min:1})
    .withMessage("Facilities are required")
];

export const hotelIdValidator=():ValidationChain[]=>[
  param("id").notEmpty().withMessage("Id is required")
]
