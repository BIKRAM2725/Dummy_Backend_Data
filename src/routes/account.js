import express from "express";

import {createAccount,getAccount} from "../controllers/account.js";

const router = express.Router();

router.post(
    "/create",
    createAccount
);

router.get(
    "/:customerId",
    getAccount
);

export default router;