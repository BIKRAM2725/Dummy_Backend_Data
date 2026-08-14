import Customer from "../models/Customer.js";

export const createCustomer = async (
    req,
    res
) => {
    try {

        const customer =
            await Customer.create(req.body);

        res.status(201).json({
            success: true,
            customer
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getCustomer = async (
    req,
    res
) => {
    try {

        const customer =
            await Customer.findById(
                req.params.id
            );

        if (!customer) {
            return res.status(404).json({
                success: false,
                message:
                    "Customer Not Found"
            });
        }

        res.status(200).json({
            success: true,
            customer
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};