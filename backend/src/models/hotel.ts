import { Schema, model } from "mongoose";
import { HotelType } from "../shared/types";



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
  },
  { timestamps: true }
);

export default model<HotelType>("hotels", hotelSchema);
