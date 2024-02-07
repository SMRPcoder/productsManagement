"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createJwt = exports.EditProductValidation = exports.AddProductValidation = exports.ViewSingleValidation = exports.LoginValidationSchema = exports.UserValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.UserValidationSchema = joi_1.default.object({
    username: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    role: joi_1.default.string().optional()
});
exports.LoginValidationSchema = joi_1.default.object({
    username: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
exports.ViewSingleValidation = joi_1.default.object({
    id: joi_1.default.string().required()
});
exports.AddProductValidation = joi_1.default.object({
    productName: joi_1.default.string().required(),
    productDetails: joi_1.default.string().optional().allow(""),
    productRate: joi_1.default.number().required(),
    productAvailable: joi_1.default.bool().optional(),
    productQuantity: joi_1.default.number().required()
});
exports.EditProductValidation = joi_1.default.object({
    id: joi_1.default.string().required(),
    productName: joi_1.default.string().optional(),
    productDetails: joi_1.default.string().optional(),
    productRate: joi_1.default.number().optional(),
    productQuantity: joi_1.default.number().optional()
}).or("productName", "productDetails", "productRate", "productQuantity");
const createJwt = (user) => {
    const token = jsonwebtoken_1.default.sign(user, "kugefuewohfiaenfciPjia3465ygsux");
    return "Bearer " + token;
};
exports.createJwt = createJwt;
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            var tokenarr = token.split(" ");
            if (tokenarr[0] == "Bearer") {
                var decoded = jsonwebtoken_1.default.verify(tokenarr[1], "kugefuewohfiaenfciPjia3465ygsux");
                resolve(decoded);
            }
            else {
                resolve(false);
            }
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.verifyToken = verifyToken;
