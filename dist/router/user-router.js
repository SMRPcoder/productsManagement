"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_user_1 = __importDefault(require("../middleware/auth-user"));
const UserController_1 = require("../controller/UserController");
const UserRouter = (0, express_1.Router)();
UserRouter.get("/viewAllProducts", auth_user_1.default, UserController_1.viewAllProducts);
UserRouter.post("/viewProduct", auth_user_1.default, UserController_1.ViewSingleProduct);
UserRouter.patch("/buyProduct/:id", auth_user_1.default, UserController_1.BuyProduct);
exports.default = UserRouter;
