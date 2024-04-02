import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../utils/catchAsyncErrors";
import Stripe from "stripe";
import Hotel from "../models/hotel";
import { ErrorHandler } from "../utils/error";
import { BookingType, PaymentIntentResponse } from "../shared/types";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const createPaymentIntent = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return next(new ErrorHandler("Hotel not found", 404));
    const amount = parseInt(numberOfNights) * hotel.pricePerNight;
    const paymentIntent = await stripe.paymentIntents.create({
      amount:amount*100,
      currency: "inr",
      metadata: {
        hotelId,
        userId: req.user.toString(),
      },
    });
    if (!paymentIntent.client_secret) {
      return next(new ErrorHandler("Payment failed", 500));
    }
    const response: PaymentIntentResponse = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      amount,
    };
    res.status(200).json(response);
  }
);
export const makeBooking = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const hotelId = req.params.hotelId;
    const paymentIntentId = req.body.paymentIntentId;
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string
    );
    if (!paymentIntent)
      return next(new ErrorHandler("Payment intent not found", 500));
    if (
      paymentIntent.metadata.hotelId !== hotelId ||
      paymentIntent.metadata.userId !== req.user.toString()
    ) {
      return next(new ErrorHandler("Payment intent mismatch", 500));
    }
    if (paymentIntent.status !== "succeeded") {
      return next(
        new ErrorHandler(
          `Payment intent not succeded. Status - ${paymentIntent.status}`,
          500
        )
      );
    }

    const newBooking: BookingType = {
      userId: req.user.toString(),
      paymentStatus: paymentIntent.status,
      ...req.body,
    };
    const hotel = await Hotel.findByIdAndUpdate(hotelId, {
      $push: {
        bookings: newBooking,
      },
    });
  
    
    if (!hotel) {
      return next(new ErrorHandler("Hotel not found", 400));
    }

    res.status(200).json({
      success: true,
      message: "Booked successfully",
    });
  }
);
