import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../utils/catchAsyncErrors";

import Hotel, { HotelType } from "../models/hotel";
import { v2 as cloudinary } from "cloudinary";
import { ErrorHandler } from "../utils/error";
import { log } from "console";
import { HotelSearchResponse, MyBookingsData } from "../shared/types";
import mongoose from "mongoose";

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

//  ! upload images to cloudinary
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

const searchHandler = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = constructSearchQuery(req.query);
    let sortOptions = {};
    switch (req.query.sortOption) {
      case "pricePerNightAscending":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDescending":
        sortOptions = { pricePerNight: -1 };
        break;
      case "starRatingAscending":
        sortOptions = { starRating: 1 };
        break;
      case "starRatingDescending":
        sortOptions = { starRating: -1 };
        break;
      case "lastUpdated":
        sortOptions = { lastUpdated: -1 };
        break;
    }
    const pageSize = 5;
    let pageNumber = parseInt(req.query.page as string) || 1;
    const skip = pageSize * (pageNumber - 1);
    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .limit(pageSize)
      .skip(skip);

    const total = await Hotel.countDocuments(query);

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.status(200).json({
      response,
    });
  }
);

const getAllMyBookings = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const allHotelsWithMyIdInBookings = await Hotel.find({
      bookings: { $elemMatch: { userId: req.user.toString() } },
    }).sort({
      createdAt: -1,
    });
    if (allHotelsWithMyIdInBookings.length === 0) {
      return res.json({
        hotel: [],
      });
    }
    const myBookings: MyBookingsData[] = allHotelsWithMyIdInBookings.map(
      (hotel): MyBookingsData => {
        const bookings = hotel.bookings.filter(
          (booking) => booking.userId.toString() === req.user.toString()
        );
        return {
          ...hotel.toObject(),
          bookings,
        };
      }
    );

    res.json({
      hotel: myBookings,
    });
  }
);

function constructSearchQuery(queryParams: any) {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      {
        country: {
          $regex: queryParams.destination,
          $options: "i",
        },
      },
    ];
  }
  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }
  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);
    if (Array.isArray(starRatings)) {
      constructedQuery.starRating = {
        $in: starRatings,
      };
    } else {
      constructedQuery.starRating = {
        $eq: starRatings,
      };
    }
    // const starRating = parseInt(queryParams.stars.toString());
    // constructedQuery.starRating = { $eq: starRating };
  }
  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice.toString()),
    };
  }

  return constructedQuery;
}
export {
  createHotel,
  getMyHotels,
  getSingleHotelDetails,
  editHotel,
  searchHandler,
  getAllMyBookings,
};
