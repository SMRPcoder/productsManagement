import { DataTypes, Model, Sequelize } from "sequelize";
import db from "../database/db";
import bcrypt from "bcrypt";
import { UUID } from "crypto";
import { UUIDV4 } from "sequelize";

interface UserAttributes{
    id:UUID,
    username:string;
    password:string;
    name:string;
    role:string;
};

class UserModel extends Model<UserAttributes> implements UserAttributes{
    public id!: UUID;
    public username!: string;
    public password!: string;
    public name!: string;
    public role!:string;
    public async hashPassword():Promise<void>{
        this.password=await bcrypt.hash(this.password,10);
    }
    public async comparePassword(password:string):Promise<boolean>{
        return await bcrypt.compare(password,this.password);
    }
};

const User =UserModel.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:UUIDV4,
        primaryKey:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.STRING,
        defaultValue:"USER"
    }
},{
    sequelize:db,
    modelName:"User"
});

User.beforeCreate(async (user:UserModel)=>{
    return user.hashPassword();
})

export default User;