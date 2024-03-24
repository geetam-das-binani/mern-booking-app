import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../utils/catchAsyncErrors";

import Hotel, { HotelType } from "../models/hotel";
import { v2 as cloudinary } from "cloudinary";
import { ErrorHandler } from "../utils/error";
import { log } from "console";

const createHotel = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const ishotelExists = await Hotel.findOne({
      name: {
        $regex: req.body.name,
        $options: "i",
      },
    });
    if (ishotelExists) {
      return next(new ErrorHandler("Hotel already exists", 400));
    }
    const imageFiles = req.files as Express.Multer.File[];
    const hotel: HotelType = req.body;

    //! upload the images to cloudinary

    const imageUrlsFromCloudinary = await uploadImages(imageFiles);

    hotel.userId = req.user;
    hotel.imageUrls = imageUrlsFromCloudinary as string[];
    hotel.lastUpdated = new Date();

    const newHotel = await Hotel.create(hotel);
    if (!newHotel) {
      return next(new ErrorHandler("Hotel not created", 400));
    }

    return res.status(201).json({
      success: true,
      hotel: newHotel,
      message: "Hotel created successfully",
    });
  }
);

const getMyHotels = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const myHotels = await Hotel.find({ userId: req.user });

    return res.status(200).json({
      success: true,
      hotel: myHotels,
      message: "My hotels fetched successfully",
    });
  }
);

const getSingleHotelDetails = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const existingHotel = await Hotel.findById(req.params.id);
    if (!existingHotel) {
      return next(new ErrorHandler("Hotel not found", 404));
    }
    res.status(200).json({
      success: true,
      hotel: existingHotel,
      message: "Hotel fetched successfully",
    });
  }
);

const editHotel = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const imageFiles = req.files as Express.Multer.File[];
    let imageUrls = req.body.imageUrls;

    //! upload the images to cloudinary
    const imageUrlsFromCloudinary = await uploadImages(imageFiles);

    req.body.imageUrls = [...(imageUrls || []), ...imageUrlsFromCloudinary];

    req.body.lastUpdated = new Date();
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedHotel) {
      return next(new ErrorHandler("Hotel not found", 404));
    }
    res.status(201).json({
      success: true,
      hotel: updatedHotel,
      message: "Hotel updated successfully",
    });
  }
);
async function uploadImages(imageFiles: Express.Multer.File[]) {
  return await Promise.all(
    imageFiles.map(async (imageFile) => {
      const b64 = Buffer.from(imageFile.buffer).toString("base64");
      let dataURI = `data:${imageFile.mimetype};base64,${b64}`;
      const res = await cloudinary.uploader.upload(dataURI, {
        folder: "hotelapp",
      });
      return res.secure_url;
    })
  );
}
export { createHotel, getMyHotels, getSingleHotelDetails, editHotel };
