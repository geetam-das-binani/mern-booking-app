import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../utils/catchAsyncErrors";
import { handleImagesUploads } from "../cloudinary/cloudinary";
import { HotelType } from "../models/hotel";
import Hotel from "../models/hotel";

import { ErrorHandler } from "../utils/error";

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

    const uploadedFiles = await handleImagesUploads(imageFiles)(req, res, next);

    hotel.userId = req.user;
    hotel.imageUrls = uploadedFiles as string[];
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

export { createHotel };
