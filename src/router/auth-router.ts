import { Router } from "express";
import { Login, Register } from "../controller/AuthController";

const AuthRouter:Router=Router();

AuthRouter.post("/register",Register);
AuthRouter.post("/login",Login);


export default AuthRouter;