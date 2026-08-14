import Employment from "../models/Employment.js";

export const createEmployment = async (
    req,
    res
) => {
    try {

        const employment =
            await Employment.create(
                req.body
            );

        res.status(201).json({
            success: true,
            employment
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getEmployment = async (
    req,
    res
) => {
    try {

        const employment =
            await Employment.findOne({
                customerId:
                    req.params.customerId
            });

        if (!employment) {
            return res.status(404).json({
                success: false,
                message:
                    "Employment Record Not Found"
            });
        }

        res.status(200).json({
            success: true,
            employment
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};