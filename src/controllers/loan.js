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

const uploadToCloudinary = (file, folder) => {
    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "auto",
                public_id: file.originalname.split(".")[0]
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result);
            }
        );

        streamifier
            .createReadStream(file.buffer)
            .pipe(uploadStream);

    });
};

export const uploadLoanDocuments = async (req, res) => {

    try {

        const { applicationId } = req.params;

        const loan = await LoanApplication.findOne({
            applicationId
        });

        if (!loan) {

            return res.status(404).json({
                success: false,
                message: "Loan application not found"
            });

        }

        // ---------------- PAN ----------------

        if (req.files?.panCard?.length) {

            const result = await uploadToCloudinary(
                req.files.panCard[0],
                "loan_documents/pan"
            );

            loan.documents.panCard = {
            url: result.secure_url,
            publicId: result.public_id,
            originalName: req.files.panCard[0].originalname
            };

        }

        // ---------------- Aadhaar ----------------

        if (req.files?.aadhaarCard?.length) {

            const result = await uploadToCloudinary(
                req.files.aadhaarCard[0],
                "loan_documents/aadhaar"
            );

            loan.documents.aadhaarCard = {
                url: result.secure_url,
                publicId: result.public_id,
                originalName: req.files.aadhaarCard[0].originalname
            };

        }

        // ---------------- Salary Slips ----------------

        if (req.files?.salarySlips?.length) {

            loan.documents.salarySlips = [];

            for (const file of req.files.salarySlips) {

                const result = await uploadToCloudinary(
                    file,
                    "loan_documents/salary_slips"
                );

                loan.documents.salarySlips.push({
                url: result.secure_url,
                publicId: result.public_id,
                originalName: file.originalname
                });

            }

        }

        // ---------------- Bank Statements ----------------

        if (req.files?.bankStatements?.length) {

            loan.documents.bankStatements = [];

            for (const file of req.files.bankStatements) {

                const result = await uploadToCloudinary(
                    file,
                    "loan_documents/bank_statements"
                );

                loan.documents.bankStatements.push({

                    url: result.secure_url,
                    publicId: result.public_id,
                    originalName: file.originalname

                });

            }

        }

        // ---------------- Other Documents ----------------

        if (req.files?.otherDocuments?.length) {

            loan.documents.otherDocuments = [];

            for (const file of req.files.otherDocuments) {

                const result = await uploadToCloudinary(
                    file,
                    "loan_documents/other_documents"
                );

                loan.documents.otherDocuments.push({

                    url: result.secure_url,
                    publicId: result.public_id,
                    originalName: file.originalname


                });

            }

        }

        await loan.save();

        return res.status(200).json({

            success: true,
            message: "Documents uploaded successfully",
            documents: loan.documents

        });

    }
    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};