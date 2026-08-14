import express from "express";

import {
    createEmployment,
    getEmployment
} from "../controllers/employment.js";

const router = express.Router();

router.post(
    "/create",
    createEmployment
);

router.get(
    "/:customerId",
    getEmployment
);

export default router;