import express from "express";
import { hotelValidator } from "../validator/validator";
import { verifyToken } from "../middlewares/auth.middleware";
import {
  createHotel,
  getMyHotels,
  editHotel,
  getSingleHotelDetails,
} from "../controllers/hotels.controllers";
import { upload } from "../multer/multer";

const router = express.Router();
router.use(verifyToken);
router.post(
  "/create-hotel",

  hotelValidator(),
  upload.array("imageFiles", 6),
  createHotel
);
router.get("/get-hotels", getMyHotels);
router.get("/hotel/:id", getSingleHotelDetails);
router.put(
  "/edit/:id",
hotelValidator(),
  upload.array("imageFiles", 6),
  editHotel
);
export { router };
