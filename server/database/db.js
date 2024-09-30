const mongoose = require("mongoose");

const connectDB = async () => {
    const connparams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        await mongoose.connect(process.env.DB, connparams);
        console.log("Connected to database");
    } catch (error) {
        console.error("Connection failed:", error);
        process.exit(1); // Optional: Exit the process with failure code
    }
};

module.exports = connectDB;
