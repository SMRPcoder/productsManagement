"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_admin_1 = __importDefault(require("../middleware/auth-admin"));
const AdminController_1 = require("../controller/AdminController");
const UserController_1 = require("../controller/UserController");
const AdminRouter = (0, express_1.Router)();
AdminRouter.post("/addProduct", auth_admin_1.default, AdminController_1.AddProduct);
// ==============accessed user controller with Admin role=====================//
AdminRouter.get("/viewAllProducts", auth_admin_1.default, UserController_1.viewAllProducts);
AdminRouter.post("/viewProduct", auth_admin_1.default, UserController_1.ViewSingleProduct);
// ==========================================================================//
AdminRouter.put("/editProduct", auth_admin_1.default, AdminController_1.EditProduct);
AdminRouter.patch("/changeAvailability/:id", auth_admin_1.default, AdminController_1.ChangeAvailability);
// ==============accessed user controller with Admin role=====================//
AdminRouter.get("/viewAllUser", auth_admin_1.default, AdminController_1.ViewAllUser);
AdminRouter.get("/viewUser/:id", auth_admin_1.default, AdminController_1.ViewUser);
// ==========================================================================//
exports.default = AdminRouter;
