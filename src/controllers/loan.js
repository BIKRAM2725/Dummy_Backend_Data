import LoanApplication from "../models/LoanApplication.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

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

const uploadToCloudinary = (fileBuffer, folder, fileName) => {
    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: "auto",
                public_id: fileName.split(".")[0]
            },
            (error, result) => {

                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }

            }
        );

        streamifier.createReadStream(fileBuffer).pipe(uploadStream);

    });
};

export const uploadLoanDocuments = async (req, res) => {
    try {

        const { applicationId } = req.params;

        console.log("Application ID:", applicationId);

        console.log("Uploaded Files:", req.files);

        const uploadedDocuments = {};

        // PAN Card
        if (req.files.panCard) {

            const file = req.files.panCard[0];

            console.log(file.originalname);

        }

        // Aadhaar Card
        if (req.files.aadhaarCard) {

            const file = req.files.aadhaarCard[0];

            console.log(file.originalname);

        }

        // Salary Slips
        if (req.files.salarySlips) {

            req.files.salarySlips.forEach(file => {

                console.log(file.originalname);

            });

        }

        // Bank Statements
        if (req.files.bankStatements) {

            req.files.bankStatements.forEach(file => {

                console.log(file.originalname);

            });

        }

        res.status(200).json({
            success: true,
            message: "Files received successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};