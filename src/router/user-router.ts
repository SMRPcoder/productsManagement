import { Router } from "express";
import AuthUser from "../middleware/auth-user";
import { BuyProduct, ViewSingleProduct, viewAllProducts } from "../controller/UserController";

const UserRouter:Router=Router();

UserRouter.get("/viewAllProducts",AuthUser,viewAllProducts);
UserRouter.post("/viewProduct",AuthUser,ViewSingleProduct);

UserRouter.patch("/buyProduct/:id",AuthUser,BuyProduct);



export default UserRouter;