import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.get('/', (req, res) => {
    res.send("API Working");
});

// Start Server
connectDB().then(() => {
    app.listen(port, () => console.log(`Server started on PORT: ${port}`));
}).catch(err => {
    console.error("Failed to start server:", err);
});