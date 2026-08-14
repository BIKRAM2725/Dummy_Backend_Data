import express from "express";

import {
    createCustomer,
    getCustomer
} from "../controllers/customer.js";

const router = express.Router();

router.post(
    "/register",
    createCustomer
);

router.get(
    "/:id",
    getCustomer
);

export default router;