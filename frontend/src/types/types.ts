import { Schema } from "mongoose";

export type RegisterFormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
};
export type LoginFormData = {
  email: string;
  password: string;
};

export type HotelFormData = {
  name: string;
  country: string;
  desc: string;
  city: string;
  type: string;
  adultCount: number;
  childCount: number;
  imageFiles: FileList;
  imageUrls: string[];
  facilities: string[];
  pricePerNight: number;
  starRating: number;
};

export type UserType = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserState = {
  user: UserType | null;
  isAuthenticated: boolean;
  toastMessageDetails: ToastProps | null;
  isLoggedIn: boolean;
};

export type DataType = {
  success: boolean;
  userWithoutPassword: UserType;
  message: string;
};

export type HotelDataType = {
  success: boolean;
  hotel: HotelType[];
  message: string;
};
export type HotelData = {
  success: boolean;
  hotel: HotelType;
  message: string;
};

export type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
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

export type SearchCriteria = {
  destination: string;
  checkIn: string;
  checkOut: string;
  adultCount: number;
  childCount: number;
  hotelId?: string;
};

export interface SearchParams {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
}

export type HotelSearchResponse = {
  response: {
    data: HotelType[];
    pagination: {
      total: number;
      page: number;
      pages: number;
    };
  };
};

export type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

export type BookingFormData = {
  email: string;
  firstName: string;
  lastName: string;
  hotelId: string;
  checkIn: string;
  checkOut: string;
  adultCount: number;
  childCount: number;
  paymentIntentId: string;
  totalPrice: number;
};

export type BookingResponse = {
  success: boolean;
  message: string;
};

export interface MyBookingsResponse extends HotelType {
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
    userId: typeof Schema.Types.ObjectId;
    _id: string;
  }[];
}

export interface Hotels{
  hotels:MyBookingsResponse[]
}