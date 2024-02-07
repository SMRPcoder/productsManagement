import Joi from "joi";
import jwt, { VerifyErrors } from "jsonwebtoken";


export const UserValidationSchema:Joi.ObjectSchema=Joi.object({
    username:Joi.string().email().required(),
    password:Joi.string().required(),
    name:Joi.string().required(),
    role:Joi.string().optional()
});

export const LoginValidationSchema:Joi.ObjectSchema=Joi.object({
    username:Joi.string().email().required(),
    password:Joi.string().required()
});

export const ViewSingleValidation:Joi.ObjectSchema=Joi.object({
    id:Joi.string().required()
});

export const AddProductValidation:Joi.ObjectSchema=Joi.object({
    productName:Joi.string().required(),
    productDetails:Joi.string().optional().allow(""),
    productRate:Joi.string().required(),
    productAvailable:Joi.bool().required()
});

export const EditProductValidation:Joi.ObjectSchema=Joi.object({
    id:Joi.string().required(),
    productName:Joi.string().optional(),
    productDetails:Joi.string().optional(),
    productRate:Joi.string().optional()
}).or("productName","productDetails","productRate");


// ========================================JWT functions========================================================//

interface UserSchema{
    id:string;
    username:string;
    name:string;
    role:string;
}

export const createJwt=(user:UserSchema):string=>{
    const token:string=jwt.sign(user,"kugefuewohfiaenfciPjia3465ygsux");
    return "Bearer "+token;
};

export interface UserVerifySchema extends jwt.JwtPayload{
    id:string;
    username:string;
    name:string;
    role:string;
    
}

export const verifyToken=(token:string):Promise<boolean | UserVerifySchema>=>{
    return new Promise((resolve,reject)=>{
        try {
            var tokenarr=token.split(" ");
        if(tokenarr[0]=="Bearer"){
            var decoded=jwt.verify(tokenarr[1],"kugefuewohfiaenfciPjia3465ygsux");
            resolve(decoded as UserVerifySchema|boolean);
        }else{
            resolve(false);
        }
        } catch (error) {
            reject(error);
        }
        
    })
    
}


