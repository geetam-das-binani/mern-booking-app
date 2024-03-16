import { ValidationError } from "express-validator";

export class ErrorHandler {
  message: string | ValidationError[];
  statusCode: number;

  constructor(message: string | ValidationError[], statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
