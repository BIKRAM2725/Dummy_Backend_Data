import express from "express";

import {
    createLoanApplication,
    getLoanApplication
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

export default router;