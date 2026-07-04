import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { i18nMiddleware } from "./config/index.js";

const app = express();

// Security
app.use(helmet());

// CORS
app.use(cors());

// Parse JSON
app.use(express.json());

// Parse URL encoded data
app.use(express.urlencoded({ extended: true }));

// Compression
app.use(compression());

// Logger
app.use(morgan("dev"));

// Backend Translation
app.use(i18nMiddleware);

// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: req.t("common:operation_successful")
    });
});

export default app;