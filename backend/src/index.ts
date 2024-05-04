import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import {router as userRoutes} from "./routes/users";
import {router as hotelRoutes} from "./routes/my-hotels";
import {router as paymentRoutes} from "./routes/payment";
import {router as DashboardRoute} from "./routes/dashboard";

import { errorMiddleware } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", hotelRoutes);
app.use("/api/v1", paymentRoutes);
app.use("/api/v1",DashboardRoute );


//-----------------------Deployment------------------------

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
});

// <-------------------- ------------------------>

app.use(errorMiddleware);

mongoose
  .connect(process.env.DB_URL as string)
  .then(() => {
    console.log("connected to db");

    app.listen(7000, () => console.log("server is running on port 7000"));
  })
  .catch((err) => {
    console.log(err.message);
    process.exit();
  });
