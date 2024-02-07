import { NextFunction,Request, Response } from "express";
import { UserVerifySchema, verifyToken } from "../functions/functions";

declare module 'express' {
    interface Request {
        userID?: string | null | undefined;
        role?: string | null | undefined;
    }
}

const AuthAdmin=(req:Request,res:Response,next:NextFunction)=>{
    const {authorization}=req.headers;
    if(authorization){
        verifyToken(authorization).then(user=>{
            if(user){
                var userVerifyed=user as UserVerifySchema;
                if(userVerifyed.role=="ADMIN"){
                    req.userID=userVerifyed.id;
                    req.role=userVerifyed.role;
                    next();
                }else{
                    res.status(401).json({message:"UnAuthorized Endpoint",status:false});
                }
                
            }else{
                res.status(401).json({message:"Invalid Token Provided",status:false});
            }
        }).catch(err=>{
            console.log(err);
            res.status(400).json({message:"Jwt Token Error",status:false});
        });

    }else{
        res.status(401).json({message:"Token Not Provided",status:false});
    }
}

export default AuthAdmin;