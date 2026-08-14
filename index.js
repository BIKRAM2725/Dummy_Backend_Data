import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import { ConnectToDB } from "./src/config/db.js";
import customerRoutes from "./src/routes/customer.js";
import employmentRoutes from "./src/routes/employment.js";
import accountRoutes from "./src/routes/account.js";
import loanRoutes from "./src/routes/loan.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/customer",customerRoutes);
app.use("/api/employment",employmentRoutes);
app.use("/api/account",accountRoutes);
app.use("/api/loan",loanRoutes);

app.get("/", (req, res) => {
    res.send("Loan Processing API Running");
});

ConnectToDB();

app.listen(port, () => {
    console.log(
        `Server running on port ${port}`
    );
});