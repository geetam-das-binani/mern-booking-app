import express from "express";
import {
  registerHandler,
  getProfileDetails,
  loginHandler,
  logoutHandler,
  updateHandler,
  getAllUsers,
  deleteUser,

} from "../controllers/users.controllers";
import { validator, loginValidator } from "../validator/validator";
import { authorizeRoles, verifyToken } from "../middlewares/auth.middleware";
import { upload } from "../multer/multer";
const router = express.Router();

router.post("/register", upload.single("photo"), registerHandler);
router.post("/login", loginValidator(), validator, loginHandler);
router.post("/logout", logoutHandler);
router.post("/update", verifyToken, upload.single("photo"), updateHandler);
// ! user have to be authenticated to access below routes
router.get("/me", verifyToken, getProfileDetails);

// Admin Routes below
router.get("/allUsers", verifyToken, authorizeRoles, getAllUsers);
router.get("/delete/:id", verifyToken, authorizeRoles, deleteUser);


export { router };
