import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true
        },

        publicId: {
            type: String,
            required: true
        },

        originalName: {
            type: String,
            required: true
        },

        uploadedAt: {
            type: Date,
            default: Date.now
        }
    },
    { _id: false }
);

const loanApplicationSchema = new mongoose.Schema(
    {
        applicationId: {
            type: String,
            required: true,
            unique: true
        },

        customerId: {
            type: String,
            required: true
        },

        loanType: {
            type: String,
            required: true,
            enum: [
                "Personal Loan",
                "Home Loan",
                "Car Loan",
                "Education Loan",
                "Business Loan"
            ]
        },

        loanAmount: {
            type: Number,
            required: true
        },

        tenureMonths: {
            type: Number,
            required: true
        },

        purpose: {
            type: String
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Under Review",
                "Approved",
                "Rejected"
            ],
            default: "Pending"
        },
        documents: {

            panCard: documentSchema,

            aadhaarCard: documentSchema,

            salarySlips: [documentSchema],

            bankStatements: [documentSchema],

            otherDocuments: [documentSchema]
        }
    },
    {
        timestamps: true
    }
);

const LoanApplication = mongoose.model(
    "LoanApplication",
    loanApplicationSchema
);

export default LoanApplication;