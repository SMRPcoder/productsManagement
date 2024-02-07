"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Register = void 0;
const functions_1 = require("../functions/functions");
const User_1 = __importDefault(require("../models/User"));
const Register = (req, res) => {
    try {
        const { value, error } = functions_1.UserValidationSchema.validate(req.body);
        if (!error) {
            const { username } = value;
            User_1.default.findOne({ where: { username } }).then(data => {
                if (data) {
                    res.status(200).json({ message: "Already Username Exists", status: false });
                }
                else {
                    var newuser = new User_1.default(value);
                    newuser.save().then(() => {
                        res.status(201).json({ message: "User Created successfully", status: true });
                    });
                }
            }).catch((err) => {
                console.log(err);
                res.status(417).json({ message: "UnExpected Error Happend", status: false });
            });
        }
        else {
            res.status(206).json({ message: error.message, status: false });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: false });
    }
};
exports.Register = Register;
const Login = (req, res) => {
    try {
        const { value, error } = functions_1.LoginValidationSchema.validate(req.body);
        if (!error) {
            const { username, password } = value;
            User_1.default.findOne({ where: { username } }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
                if (data) {
                    const isValid = yield data.comparePassword(password);
                    if (isValid) {
                        var token = (0, functions_1.createJwt)({ id: data.id, username: data.username, name: data.name, role: data.role });
                        res.status(200).json({ message: "Logged in Successfully", status: true, token });
                    }
                    else {
                        res.status(405).json({ message: "Password Missmatch", status: false });
                    }
                }
                else {
                    res.status(404).json({ message: "User Not Found", status: false });
                }
            }));
        }
        else {
            res.status(206).json({ message: error.message, status: false });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: false });
    }
};
exports.Login = Login;
