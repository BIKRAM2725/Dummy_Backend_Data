import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
    {
        customerId: {
            type: String,
            required: true
        },

        accountNumber: {
            type: String,
            required: true,
            unique: true
        },

        bankName: {
            type: String,
            required: true
        },

        accountType: {
            type: String,
            enum: [
                "Savings",
                "Current"
            ],
            default: "Savings"
        },

        averageBalance: {
            type: Number,
            required: true
        },

        salaryCredit: {
            type: Number,
            required: true
        },

        emiAmount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Account = mongoose.model(
    "Account",
    accountSchema
);

export default Account;