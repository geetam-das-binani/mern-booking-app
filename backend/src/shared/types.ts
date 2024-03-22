import { Schema } from "mongoose";

export type HotelType = {
    _id: string;
    userId:typeof Schema.Types.ObjectId;
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
  };