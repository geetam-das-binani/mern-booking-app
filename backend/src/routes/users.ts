import express from "express";
import {
  registerHandler,
  getProfileDetails,
  loginHandler,
  logoutHandler,
  updateHandler,
} from "../controllers/users.controllers";
import {
 
  validator,
  loginValidator,

} from "../validator/validator";
import { verifyToken } from "../middlewares/auth.middleware";
import { upload } from "../multer/multer";
const router = express.Router();

router.post("/register",upload.single("photo"), registerHandler);
router.post("/login", loginValidator(), validator, loginHandler);
router.post("/logout", logoutHandler);
router.post(
  "/update",
  verifyToken,
  upload.single("photo"),
  updateHandler
);
// ! user have to be authenticated to access below routes
router.get("/me", verifyToken, getProfileDetails);

export { router };
