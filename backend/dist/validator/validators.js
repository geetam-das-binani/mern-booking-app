"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = exports.validator = void 0;
const express_validator_1 = require("express-validator");
const error_1 = require("../utils/error");
const validator = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    return next(new error_1.ErrorHandler(errors.array(), 400));
};
exports.validator = validator;
const registerValidator = () => [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
    (0, express_validator_1.body)("firstName").notEmpty().withMessage("First name is required"),
    (0, express_validator_1.body)("lastName").notEmpty().withMessage("Last name is required")
];
exports.registerValidator = registerValidator;
const loginValidator = () => [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password is required")
];
exports.loginValidator = loginValidator;
