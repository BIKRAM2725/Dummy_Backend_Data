import LoanApplication from "../models/LoanApplication.js";

export const createLoanApplication =
async (req, res) => {

    try {

        const loan =
            await LoanApplication.create(
                req.body
            );

        res.status(201).json({
            success: true,
            loan
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getLoanApplication =
async (req, res) => {

    try {

        const loan =
            await LoanApplication.findOne({
                applicationId:
                    req.params.applicationId
            });

        if (!loan) {
            return res.status(404).json({
                success: false,
                message:
                    "Loan Application Not Found"
            });
        }

        res.status(200).json({
            success: true,
            loan
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};