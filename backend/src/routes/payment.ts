import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { createPaymentIntent,makeBooking } from "../controllers/payment.controllers";
const router = express.Router();


router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  createPaymentIntent
);

router.post(
  "/:hotelId/bookings",
  verifyToken,
 makeBooking
);
export { router };
