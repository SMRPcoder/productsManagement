"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controller/AuthController");
const AuthRouter = (0, express_1.Router)();
AuthRouter.post("/register", AuthController_1.Register);
AuthRouter.post("/login", AuthController_1.Login);
exports.default = AuthRouter;
