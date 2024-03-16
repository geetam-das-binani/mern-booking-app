"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsyncErrors = void 0;
const catchAsyncErrors = (callback) => (req, res, next) => {
    Promise.resolve(callback(req, res, next)).catch((err) => {
        console.log(err, "error");
        next(err);
    });
};
exports.catchAsyncErrors = catchAsyncErrors;
// export const notFound = (req: Request, res: Response, next: NextFunction) => {
//   res.status(404).json({ message: "Not Found" });
// }
