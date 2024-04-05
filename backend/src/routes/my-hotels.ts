import express from "express";
import {
  hotelIdValidator,
  hotelValidator,
  validator,
} from "../validator/validator";
import { verifyToken } from "../middlewares/auth.middleware";
import {
  createHotel,
  getMyHotels,
  getAllHotels,
  editHotel,
  getSingleHotelDetails,
  searchHandler,
  getAllMyBookings,
  reviewHandler
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
router.post(
  "/create-hotel",

  hotelValidator(),
  upload.array("imageFiles", 6),
  createHotel
);
router.get("/get-hotels", getMyHotels);

router.put(
  "/edit/:id",
  hotelValidator(),
  upload.array("imageFiles", 6),
  editHotel
);

router.get(
  "/mybookings",

  getAllMyBookings
);
router.post("/reviews/:id",reviewHandler)

export { router };
