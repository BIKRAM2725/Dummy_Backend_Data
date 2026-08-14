import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        customerId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        fullName: {
            type: String,
            required: true,
            trim: true
        },

        panNumber: {
            type: String,
            required: true,
            unique: true,
            uppercase: true
        },

        aadhaarNumber: {
            type: String,
            required: true,
            unique: true
        },

        dateOfBirth: {
            type: Date,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true
        },

        address: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Customer = mongoose.model(
    "Customer",
    customerSchema
);

export default Customer;