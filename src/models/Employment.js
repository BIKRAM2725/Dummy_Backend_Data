import mongoose from "mongoose";

const employmentSchema = new mongoose.Schema(
    {
        customerId: {
            type: String,
            required: true
        },

        employerName: {
            type: String,
            required: true
        },

        designation: {
            type: String,
            required: true
        },

        joiningDate: {
            type: Date,
            required: true
        },

        employmentType: {
            type: String,
            enum: [
                "Full-Time",
                "Part-Time",
                "Contract"
            ],
            default: "Full-Time"
        },

        monthlySalary: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Employment = mongoose.model(
    "Employment",
    employmentSchema
);

export default Employment;