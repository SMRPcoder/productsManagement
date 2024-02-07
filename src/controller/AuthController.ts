import { Request, Response } from "express";
import { LoginValidationSchema, UserValidationSchema, createJwt } from "../functions/functions";
import User from "../models/User";

interface LoginSchema {
    username:string,
    password:string
}

export const Register=(req:Request,res:Response)=>{
    try {
        const {value,error}=UserValidationSchema.validate(req.body);
        if(!error){
            const {username}=value;
            User.findOne({where:{username}}).then(data=>{
                if(data){
                   res.status(200).json({message:"Already Username Exists",status:false});
                }else{
                    var newuser=new User(value);
                    newuser.save().then(()=>{
                        res.status(201).json({message:"User Created successfully",status:true});
                    })
                }
            }).catch((err)=>{
                console.log(err);
                res.status(417).json({message:"UnExpected Error Happend",status:false});
            })
        }else{
            res.status(206).json({message:error.message,status:false});
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal Server Error",status:false});
    }
}



export const Login=(req:Request,res:Response)=>{
    try {

        const {value,error}=LoginValidationSchema.validate(req.body);
        if(!error){
            const {username,password}=value;
            User.findOne({where:{username}}).then(async(data)=>{
                if(data){
                    const isValid:boolean=await data.comparePassword(password);
                    if(isValid){
                        var token:string=createJwt({id:data.id,username:data.username,name:data.name,role:data.role});
                        res.status(200).json({message:"Logged in Successfully",status:true,token});
                    }else{
                        res.status(405).json({message:"Password Missmatch",status:false});
                    }
                }else{
                    res.status(404).json({message:"User Not Found",status:false});
                }
            })
        }else{
            res.status(206).json({message:error.message,status:false});
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal Server Error",status:false});
    }
}