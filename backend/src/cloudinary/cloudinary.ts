import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/error";
export const handleImagesUploads =
  (imageFiles: Express.Multer.File[]) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<string[] | undefined> => {
    try {
      const uploadedUrls: string[] = [];
      for (const imageFile of imageFiles) {
        // Use a unique identifier as the filename
        const filename = `${Date.now()}-${Math.floor(Math.random() * 10000)}-${
          imageFile.originalname
        }`;
        const filePath = path.join(__dirname, "../../", "uploads", filename);

        // Save the file to the local temporary directory
        fs.writeFileSync(filePath, imageFile.buffer);

        // Upload file directly to Cloudinary
        const cloudinaryRes = await cloudinary.uploader.upload(filePath, {
          folder: "hotelapp",
        });

        // Push the uploaded URL to the array
        uploadedUrls.push(cloudinaryRes.secure_url);

        // Delete the local file after upload (optional)
        fs.unlinkSync(filePath);
      }
      return uploadedUrls;
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  };

// alternative code:
// const uploadPromises = await Promise.all(
//   imageFiles.map(async (imageFile) => {
//     const b64 = Buffer.from(imageFile.buffer).toString("base64");
//     let dataURI = `data:${imageFile.mimetype};base64,${b64}`;
//     const res=await cloudinary.uploader.upload(b64, {
//       folder: "hotelapp",
//     });
//     return res.secure_url;
//   })
// );
// 700 metres from New Market, Hotel Angina is situated in Kolkata and provides air-conditioned rooms. This 3-star hotel offers room service, a 24-hour front desk and free WiFi. The accommodation features an ATM, a tour desk and currency exchange for guests. All rooms at the hotel are fitted with a seating area, a flat-screen TV with satellite channels and a private bathroom with free toiletries and a shower. At Hotel Angina the rooms are fitted with bed linen and towels. Popular points of interest near the accommodation include Park Street Metro Station, Esplanade Metro Station and Eden Gardens. The nearest airport is Netaji Subhash Chandra Bose International Airport, 15 km from Hotel Angina.
