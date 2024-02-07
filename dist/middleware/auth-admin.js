"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("../functions/functions");
const AuthAdmin = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        (0, functions_1.verifyToken)(authorization).then(user => {
            if (user) {
                var userVerifyed = user;
                if (userVerifyed.role == "ADMIN") {
                    req.userID = userVerifyed.id;
                    req.role = userVerifyed.role;
                    next();
                }
                else {
                    res.status(401).json({ message: "UnAuthorized Endpoint", status: false });
                }
            }
            else {
                res.status(401).json({ message: "Invalid Token Provided", status: false });
            }
        }).catch(err => {
            console.log(err);
            res.status(400).json({ message: "Jwt Token Error", status: false });
        });
    }
    else {
        res.status(401).json({ message: "Token Not Provided", status: false });
    }
};
exports.default = AuthAdmin;
