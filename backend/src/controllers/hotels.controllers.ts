import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../utils/catchAsyncErrors";
import Hotel, { HotelType } from "../models/hotel";
import { v2 as cloudinary } from "cloudinary";
import { ErrorHandler } from "../utils/error";
import {
  HotelSearchResponse,
  MyBookingsData,
  ReviewType,
} from "../shared/types";

// !  user controllers
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

const getAllHotels = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const hotels = await Hotel.find({}).sort({
      lastUpdated: -1,
    });
    if (hotels.length === 0) {
      return res.status(200).json({
        hotels: [],
      });
    }

    return res.status(200).json({
      hotels,
    });
  }
);

const reviewHandler = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const hotelId = req.params.id as string;

    const { rating, comment, name, avatar }: ReviewType = req.body;

    let hotel = await Hotel.findById(hotelId);

    if (hotel?._id) {
      const reviewObject = {
        userId: req.user.toString(),
        rating,
        comment,
        name,
        avatar,
      };

      const isReviewed = hotel?.reviews?.find(
        (review) => review?.userId?.toString() === req.user.toString()
      );
      let updatedReviews: ReviewType[] = [];
      if (isReviewed) {
        updatedReviews = hotel?.reviews?.map((review) =>
          review?.userId?.toString() === req.user.toString()
            ? reviewObject
            : review
        );
        hotel.reviews = updatedReviews;
      } else {
        hotel = await Hotel.findByIdAndUpdate(
          hotelId,
          { $push: { reviews: reviewObject } },
          { new: true }
        );
        updatedReviews = hotel?.reviews as ReviewType[];
      }

      let averageStaRating =
        updatedReviews.reduce((sum, review) => sum + review.rating, 0) /
        updatedReviews.length;
      hotel!.starRating = Math.floor(averageStaRating);
      await hotel?.save();
      return res.status(200).json({
        success: true,
        message: `Review ${isReviewed ? "updated" : "added"} successfully`,
      });
    } else {
      return next(new ErrorHandler("Hotel not found", 404));
    }
  }
);

const deleteHandler = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const hotelId = req.params.id as string;
    if (!hotelId) {
      return next(new ErrorHandler("Hotel not found", 404));
    }
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return next(new ErrorHandler("Hotel not found", 404));

    const updatedReviews = hotel?.reviews?.filter(
      (review) => review.userId?.toString() !== req.user.toString()
    );
    hotel!.reviews = updatedReviews;
    await hotel.save();

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  }
);

//! Admin Protected Controllers
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

const adminAllReviewsHandler = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const allHotelsWithReviews = await Hotel.find({
      reviews: {
        $exists: true,
      },
    });
    const transformedReviews = allHotelsWithReviews.map((hotel) => ({
      _id: hotel._id,
      reviews: hotel.reviews.filter(
        (review) => review.userId?.toString() !== process.env.ADMIN_ID
      )
    }));
    res.status(200).json(transformedReviews);
  }
);

const adminReviewsDeleteHandler = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const hotelId = req.params.id as string;

    if (!hotelId) {
      return next(new ErrorHandler("Hotel not found", 404));
    }
    const { reviewId }: { reviewId: string } = req.body;
    if (!reviewId) {
      return next(new ErrorHandler("Review not found", 404));
    }
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return next(new ErrorHandler("Hotel not found", 404));

    const updatedReviews = await Hotel.findByIdAndUpdate(
      hotelId,
      {
        $pull: {
          reviews: {
            _id: reviewId,
          },
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
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
  getAllHotels,
  reviewHandler,
  deleteHandler,
  adminReviewsDeleteHandler,
  adminAllReviewsHandler,
};
