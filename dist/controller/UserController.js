"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyProduct = exports.ViewSingleProduct = exports.viewAllProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const functions_1 = require("../functions/functions");
const viewAllProducts = (req, res) => {
    try {
        const { page } = req.query;
        var limit = 20;
        var offset = 0;
        if (page) {
            offset = (Number(page) * limit) - limit;
        }
        Product_1.default.findAndCountAll({ limit, offset, order: [['updatedAt', 'DESC']] }).then(data => {
            res.status(200).json({ data, status: true });
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
exports.viewAllProducts = viewAllProducts;
const ViewSingleProduct = (req, res) => {
    try {
        const { value, error } = functions_1.ViewSingleValidation.validate(req.body);
        if (!error) {
            const { id } = value;
            Product_1.default.findOne({ where: { id } }).then(data => {
                if (data) {
                    res.status(200).json({ data, status: true });
                }
                else {
                    res.status(404).json({ message: "Product Not Found", status: false });
                }
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
exports.ViewSingleProduct = ViewSingleProduct;
const BuyProduct = (req, res) => {
    try {
        const { id } = req.params;
        Product_1.default.findOne({ where: { id } }).then(data => {
            if (data) {
                var updateVals = { productQuantity: (data.productQuantity - 1) };
                if (data.productQuantity == 1 || data.productQuantity < 1) {
                    updateVals["productAvailable"] = false;
                }
                data.update(updateVals).then(() => {
                    res.status(200).json({ message: "Purchased Successfully", status: true });
                }).catch(err => {
                    console.log(err);
                    res.status(417).json({ message: "Unexpected Error Happend!", status: false });
                });
            }
            else {
                res.status(404).json({ message: "Product Not Found", status: false });
            }
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Unexpected Error Happend!", status: false });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: false });
    }
};
exports.BuyProduct = BuyProduct;
