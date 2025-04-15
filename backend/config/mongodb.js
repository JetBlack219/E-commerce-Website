import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("Database Connected");
        });
        
        mongoose.connection.on('error', (err) => {
            console.error("Database Connection Error:", err);
        });

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected:", mongoose.connection.host);
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
    }
};

export default connectDB;