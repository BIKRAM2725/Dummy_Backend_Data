import express from "express";
import upload from "../middleware/upload.js";

import {
    createLoanApplication,
    getLoanApplication,
    uploadLoanDocuments
} from "../controllers/loan.js";

const router = express.Router();

router.post(
    "/create",
    createLoanApplication
);

router.get(
    "/:applicationId",
    getLoanApplication
);

router.post(
    "/upload/:applicationId",
    upload.fields([
        {
            name: "panCard",
            maxCount: 1
        },
        {
            name: "aadhaarCard",
            maxCount: 1
        },
        {
            name: "salarySlips",
            maxCount: 3
        },
        {
            name: "bankStatements",
            maxCount: 6
        },
        {
            name: "otherDocuments",
            maxCount: 10
        }
    ]),
    uploadLoanDocuments
);

export default router;