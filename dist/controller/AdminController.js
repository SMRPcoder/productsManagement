"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewUser = exports.ViewAllUser = exports.ChangeAvailability = exports.EditProduct = exports.AddProduct = void 0;
const functions_1 = require("../functions/functions");
const Product_1 = __importDefault(require("../models/Product"));
const User_1 = __importDefault(require("../models/User"));
const AddProduct = (req, res) => {
    try {
        const { value, error } = functions_1.AddProductValidation.validate(req.body);
        if (!error) {
            var newProduct = new Product_1.default(value);
            newProduct.save().then(() => {
                res.status(200).json({ message: "Product Created successfully", status: true });
            }).catch(err => {
                console.log(err);
                res.status(417).json({ message: "Unexpected Error Happend!", status: false });
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
exports.AddProduct = AddProduct;
const EditProduct = (req, res) => {
    try {
        const { value, error } = functions_1.EditProductValidation.validate(req.body);
        if (!error) {
            Product_1.default.findOne({ where: { id: value.id } }).then((data) => {
                if (data) {
                    data.update(value).then(updated => {
                        res.status(200).json({ message: "Updated Successfully", status: true });
                    }).catch(err => {
                        console.log(err);
                        res.status(417).json({ message: "Unexpected Error!", status: false });
                    });
                }
                else {
                    res.status(404).json({ message: "Product Not Found", status: false });
                }
            }).catch(err => {
                console.log(err);
                res.status(417).json({ message: "Unexpected Error!", status: false });
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
exports.EditProduct = EditProduct;
const ChangeAvailability = (req, res) => {
    try {
        const { id } = req.params;
        Product_1.default.findOne({ where: { id } }).then(data => {
            if (data) {
                data.update({ productAvailable: !data.productAvailable }).then(updated => {
                    res.status(200).json({ message: "Updated Successfully", status: true });
                }).catch(err => {
                    console.log(err);
                    res.status(417).json({ message: "Unexpected Error!", status: false });
                });
            }
            else {
                res.status(404).json({ message: "Product Not Found", status: false });
            }
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Unexpected Error!", status: false });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: false });
    }
};
exports.ChangeAvailability = ChangeAvailability;
const ViewAllUser = (req, res) => {
    try {
        const { page } = req.query;
        var limit = 20;
        var offset = 0;
        if (page) {
            if (!isNaN(Number(page))) {
                offset = (Number(page) * limit) - limit;
            }
        }
        User_1.default.findAndCountAll({ where: { role: "USER" }, limit, offset }).then(data => {
            res.status(200).json({ data, status: true });
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Unexpected Error Happend!!!", status: false });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: false });
    }
};
exports.ViewAllUser = ViewAllUser;
const ViewUser = (req, res) => {
    try {
        const { id } = req.params;
        User_1.default.findOne({ where: { id } }).then(data => {
            if (data) {
                res.status(200).json({ data, status: true });
            }
            else {
                res.status(404).json({ message: "User Not found", status: true });
            }
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Unexpected Error Happend!!!", status: false });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: false });
    }
};
exports.ViewUser = ViewUser;
