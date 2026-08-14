import Account from "../models/Account.js";

export const createAccount = async (
    req,
    res
) => {
    try {

        const account =
            await Account.create(
                req.body
            );

        res.status(201).json({
            success: true,
            account
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAccount = async (
    req,
    res
) => {
    try {

        const account =
            await Account.findOne({
                customerId:
                    req.params.customerId
            });

        if (!account) {
            return res.status(404).json({
                success: false,
                message:
                    "Account Not Found"
            });
        }

        res.status(200).json({
            success: true,
            account
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};