import { Schema } from "mongoose";

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type PaymentIntentResponse = {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
};

export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  totalPrice: number;
  paymentStatus: string;
  createdAt?: Date;
};


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
};

export interface MyBookingsData extends HotelType {
  bookings: {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    totalPrice: number;
    paymentStatus: string;
    firstName: string;
    lastName: string;
    email: string;
    userId: string;
    _id: string;
  }[];
}

export type ReviewType = {
  _id?: string;
  userId?: string;
  rating: number;
  comment: string;
  name: string;
  avatar: string;
  hotelId?: string;
  createdAt?: Date;
};
