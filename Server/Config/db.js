const mongoose = require("mongoose");

const ConnnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to DB");

        // Graceful shutdown
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            console.log("🛑 MongoDB connection closed due to app termination (SIGINT)");
            process.exit(0);
        });

        process.on("SIGTERM", async () => {
            await mongoose.connection.close();
            console.log("🛑 MongoDB connection closed due to app termination (SIGTERM)");
            process.exit(0);
        });

        process.on("exit", async () => {
            await mongoose.connection.close();
            console.log("🛑 MongoDB connection closed due to process exit");
        });
    } catch (err) {
        console.error("❌ Error while connecting to DB");
        console.error(err);
    }
};

module.exports = { ConnnectDB };
