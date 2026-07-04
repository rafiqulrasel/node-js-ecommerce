import "./config/env.js";
import app from "./app.js";
import connectDB from "./config/database.js";

const PORT = process.env.PORT || 5000;

const bootstrap = async () => {
    try {
        // Connect Database
        await connectDB();

        // Start Server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Server startup failed");
        console.error(error);
        process.exit(1);
    }
};

bootstrap();

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    process.exit(1);
});

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});