import { Router } from "express";
import AuthAdmin from "../middleware/auth-admin";
import { AddProduct, ChangeAvailability, EditProduct, ViewAllUser, ViewUser } from "../controller/AdminController";
import { ViewSingleProduct, viewAllProducts } from "../controller/UserController";

const AdminRouter:Router=Router();

AdminRouter.post("/addProduct",AuthAdmin,AddProduct);

// ==============accessed user controller with Admin role=====================//
AdminRouter.get("/viewAllProducts",AuthAdmin,viewAllProducts);
AdminRouter.post("/viewProduct",AuthAdmin,ViewSingleProduct);
// ==========================================================================//

AdminRouter.put("/editProduct",AuthAdmin,EditProduct);
AdminRouter.patch("/changeAvailability/:id",AuthAdmin,ChangeAvailability);

// ==============accessed user controller with Admin role=====================//
AdminRouter.get("/viewAllUser",AuthAdmin,ViewAllUser);
AdminRouter.get("/viewUser/:id",AuthAdmin,ViewUser);

// ==========================================================================//



export default AdminRouter;