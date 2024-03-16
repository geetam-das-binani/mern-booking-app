"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const error_middleware_1 = require("./middlewares/error.middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
app.use('/api/v1', users_1.default);
app.use(error_middleware_1.errorMiddleware);
mongoose_1.default.connect(process.env.DB_URL)
    .then(() => {
    console.log('connected to db');
    app.listen(7000, () => console.log('server is running on port 7000'));
})
    .catch((err) => {
    console.log(err);
    process.exit();
});
