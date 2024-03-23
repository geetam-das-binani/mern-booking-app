import express from "express";
import { hotelValidator, } from "../validator/validator";
import { verifyToken } from "../middlewares/auth.middleware";
import { createHotel,getMyHotels } from "../controllers/hotels.controllers";
import { upload } from "../multer/multer";

const router = express.Router();

router.post(
  "/create-hotel",
  verifyToken,
  hotelValidator(),
upload.array("imageFiles", 6),
  createHotel
);
router.get("/get-hotels", verifyToken, getMyHotels);
export default router;
