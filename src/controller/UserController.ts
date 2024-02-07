import { Request, Response } from "express";
import Product from "../models/Product";
import { ViewSingleValidation } from "../functions/functions";


export const viewAllProducts = (req: Request, res: Response) => {
    try {
        const { page } = req.query;
        var limit = 20;
        var offset = 0;
        if (page) {
            offset = (Number(page) * limit) - limit;
        }
        Product.findAndCountAll({ limit, offset,order: [['updatedAt', 'DESC']] }).then(data => {
            res.status(200).json({ data, status: true });
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Unexpected Error!", status: false });
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: false });
    }

}

export const ViewSingleProduct = (req: Request, res: Response) => {
    try {
        const { value, error } = ViewSingleValidation.validate(req.body);
        if (!error) {
            const { id } = value;
            Product.findOne({ where: { id } }).then(data => {
                if (data) {
                    res.status(200).json({ data, status: true });
                } else {
                    res.status(404).json({ message: "Product Not Found", status: false });
                }
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


export const BuyProduct = (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        Product.findOne({ where: { id } }).then(data => {
            if (data) {
                var updateVals: { productQuantity: number, productAvailable?: boolean } = { productQuantity: (data.productQuantity - 1) };
                if (data.productQuantity == 1 || data.productQuantity < 1) {
                    updateVals["productAvailable"] = false;
                }
                data.update(updateVals).then(() => {
                    res.status(200).json({ message: "Purchased Successfully", status: true });
                }).catch(err => {
                    console.log(err);
                    res.status(417).json({ message: "Unexpected Error Happend!", status: false });
                })
            } else {
                res.status(404).json({ message: "Product Not Found", status: false });
            }
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Unexpected Error Happend!", status: false });
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: false });
    }
}