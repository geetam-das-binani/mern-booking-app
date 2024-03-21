import express from "express";
import { hotelValidator, validator } from "../validator/validators";
import { verifyToken } from "../middlewares/auth.middleware";
import { createHotel } from "../controllers/hotels.controllers";
import { upload } from "../multer/multer";
import { body } from "express-validator";
const router = express.Router();

router.post(
  "/create-hotel",
  verifyToken,
  hotelValidator(),
upload.array("imageFiles", 6),
  createHotel
);

export default router;
