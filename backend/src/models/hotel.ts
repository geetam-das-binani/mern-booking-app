import mongoose from "mongoose";
import { BookingType } from "../shared/types";
import { bookingSchema } from "./booking";

const Schema = mongoose.Schema;
const model = mongoose.model;

export type HotelType = {
  _id: string;
  userId: typeof Schema.Types.ObjectId;
  name: string;
  country: string;
  desc: string;
  city: string;
  type: string;
  adultCount: number;
  childCount: number;
  imageUrls: string[];
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  lastUpdated: Date;
  bookings: BookingType[];
};

const hotelSchema = new Schema<HotelType>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    name: { type: String, required: true },
    country: { type: String, required: true },
    desc: { type: String, required: true },
    city: { type: String, required: true },
    type: { type: String, required: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    imageUrls: [
      {
        type: String,
        required: true,
      },
    ],
    facilities: [
      {
        type: String,
        required: true,
      },
    ],
    pricePerNight: { type: Number, required: true },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    lastUpdated: { type: Date, required: true },
    bookings: [bookingSchema],
  },
  { timestamps: true }
);

export default model<HotelType>("hotels", hotelSchema);
