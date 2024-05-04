import { catchAsyncErrors } from "../utils/catchAsyncErrors";
import { User } from "../models/user";
import Hotel from "../models/hotel";
export const getDashboardData = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({
    isAdmin: false,
    _id: {
      $ne: process.env.ADMIN_ID,
    },
  });
  const hotels = await Hotel.find({});
  const bookings = await Hotel.find({
    bookings: {
      $exists: true,
    },
  });
  const allReviews = await Hotel.find({
   
    reviews: {
      $exists: true,
    },
  });
  const transformedBookings = bookings.map((elem) => elem.bookings).flat();

  // * all reviews except the admin one
  const transformedReviews = allReviews.map((elem) => {
    const userReviews=elem.reviews.filter(review=>review.userId?.toString() !== process.env.ADMIN_ID)
    return userReviews
  }).flat()

  return res.status(200).json({
    users,
    hotels,
    bookings: transformedBookings,
    reviews: transformedReviews,
  });
});
