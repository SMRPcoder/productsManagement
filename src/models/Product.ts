import { DataTypes, Model, Sequelize,UUIDV4 } from "sequelize";
import db from "../database/db";
import { UUID } from "crypto";

interface ProductAttributes{
    id:UUID,
    productName:string;
    productDetails:string;
    productRate:string;
    productAvailable:boolean;
    createdAt?:Date;
    updatedAt?:Date;
}

class ProductModel extends Model<ProductAttributes> implements ProductAttributes{
    public id!:UUID
    public productName!: string;
    public productDetails!: string;
    public productRate!: string;
    public productAvailable!: boolean;
    public createdAt?: Date;
    public updatedAt?: Date;
}

const Product=ProductModel.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:UUIDV4,
        primaryKey:true
    },
    productName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    productDetails:{
        type:DataTypes.STRING,
        allowNull:false
    },
    productAvailable:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    productRate:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{sequelize:db,modelName:"Product"});

export default Product;