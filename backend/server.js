const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ Import CORS
const connectDatabase = require("./config/db");
const newsRoutes = require("./routes/routes"); // Import the news routes

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" })); // ✅ Enable CORS for frontend
app.use(express.json());
connectDatabase();

// Home Route - Show MongoDB Connection Status
app.get("/", (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 
        ? "✅ MongoDB Connected" 
        : "❌ MongoDB Not Connected";

    res.send(`<h2>Welcome to the News Aggregator API!</h2><p>${dbStatus}</p>`);
});

// Use Routes
app.use("/api", newsRoutes); // All news routes will be under "/api/news"

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
