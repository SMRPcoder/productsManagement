import { Request, Response } from "express";
import { AddProductValidation, EditProductValidation } from "../functions/functions";
import Product from "../models/Product";
import User from "../models/User";


export const AddProduct = (req: Request, res: Response) => {
    try {
        const { value, error } = AddProductValidation.validate(req.body);
        if (!error) {
            var newProduct = new Product(value);
            newProduct.save().then(() => {
                res.status(200).json({ message: "Product Created successfully", status: true });
            }).catch(err => {
                console.log(err);
                res.status(417).json({ message: "Unexpected Error Happend!", status: false });
            })
        } else {
            res.status(206).json({ message: error.message, status: false });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: false });
    }
}

export const EditProduct = (req: Request, res: Response) => {
    try {
        const { value, error } = EditProductValidation.validate(req.body);
        if (!error) {
            Product.findOne({ where: { id: value.id } }).then((data) => {
                if (data) {
                    data.update(value).then(updated => {
                        res.status(200).json({ message: "Updated Successfully", status: true });
                    }).catch(err => {
                        console.log(err);
                        res.status(417).json({ message: "Unexpected Error!", status: false });
                    })
                } else {
                    res.status(404).json({ message: "Product Not Found", status: false });
                }
            }).catch(err => {
                console.log(err);
                res.status(417).json({ message: "Unexpected Error!", status: false });
            })
        } else {
            res.status(206).json({ message: error.message, status: false });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: false });
    }
}

export const ChangeAvailability = (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        Product.findOne({ where: { id } }).then(data => {
            if (data) {
                data.update({ productAvailable: !data.productAvailable }).then(updated => {
                    res.status(200).json({ message: "Updated Successfully", status: true });
                }).catch(err => {
                    console.log(err);
                    res.status(417).json({ message: "Unexpected Error!", status: false });
                })
            } else {
                res.status(404).json({ message: "Product Not Found", status: false });
            }
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Unexpected Error!", status: false });
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: false });
    }
}


export const ViewAllUser = (req: Request, res: Response) => {
    try {
        const { page } = req.query;
        var limit = 20;
        var offset = 0;
        if (page) {
            if (!isNaN(Number(page))) {
                offset = (Number(page) * limit) - limit;
            }
        }
        User.findAndCountAll({where:{role:"USER"}, limit, offset }).then(data => {
            res.status(200).json({ data, status: true });
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Unexpected Error Happend!!!", status: false });
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: false });
    }
}

export const ViewUser = (req: Request, res: Response) => {
    try {
        const {id}=req.params;
        User.findOne({ where:{id} }).then(data => {
            if(data){
                res.status(200).json({ data, status: true });
            }else{
                res.status(404).json({ message:"User Not found", status: true });
            }
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Unexpected Error Happend!!!", status: false });
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: false });
    }
}