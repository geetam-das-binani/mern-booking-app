"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users.controller");
const validators_1 = require("../validator/validators");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/register", (0, validators_1.registerValidator)(), validators_1.validator, users_controller_1.registerHandler);
router.post("/login", (0, validators_1.loginValidator)(), validators_1.validator, users_controller_1.loginHandler);
router.post('/logout', users_controller_1.logoutHandler);
// ! user have to be authenticated to access below routes
router.get("/me", auth_middleware_1.verifyToken, users_controller_1.getProfileDetails);
exports.default = router;
