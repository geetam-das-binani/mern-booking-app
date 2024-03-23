
import {Schema} from 'mongoose';
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

export type HotelDataType={
  success:boolean,
  hotel:HoteType[],
  message:string
}
export type HotelData ={
  success:boolean,
  hotel:HoteType,
  message:string
}

export type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type HoteType ={
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
}
