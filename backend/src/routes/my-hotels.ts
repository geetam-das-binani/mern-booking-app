import express from "express";
import {
  hotelIdValidator,
  hotelValidator,
  validator,
} from "../validator/validator";
import { authorizeRoles, verifyToken } from "../middlewares/auth.middleware";
import {
  createHotel,
  getMyHotels,
  getAllHotels,
  editHotel,
  getSingleHotelDetails,
  searchHandler,
  getAllMyBookings,
  reviewHandler,
  deleteHandler,
  adminReviewsDeleteHandler,
  adminAllReviewsHandler
} from "../controllers/hotels.controllers";
import { upload } from "../multer/multer";

const router = express.Router();
router.route("/allhotels").get(getAllHotels);
router.route("/search").get(searchHandler);
router
  .route("/hotel/:id")
  .get(hotelIdValidator(), validator, getSingleHotelDetails);

router.use(verifyToken);
//! user have to be logged in for accessing below routes
router.get(
  "/mybookings",

  getAllMyBookings
);
router.post("/reviews/delete/:id", deleteHandler);
router.post("/reviews/:id", reviewHandler);

// ! Admin Protected Routes
router.get("/get-hotels", authorizeRoles, getMyHotels);
router.post(
  "/create-hotel",

  hotelValidator(),
  upload.array("imageFiles", 6),
  authorizeRoles,
  createHotel
);

router.put(
  "/edit/:id",
  hotelValidator(),
  upload.array("imageFiles", 6),
  authorizeRoles,
  editHotel
);
router.get("/admin-get-reviews", authorizeRoles, adminAllReviewsHandler);
router.post("/admin-delete-review/:id", authorizeRoles, adminReviewsDeleteHandler);
export { router };
