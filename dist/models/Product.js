"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
class ProductModel extends sequelize_1.Model {
}
const Product = ProductModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.UUIDV4,
        primaryKey: true
    },
    productName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    productDetails: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    productAvailable: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    productRate: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    productQuantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
}, { sequelize: db_1.default, modelName: "Product" });
exports.default = Product;
