const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDatabase = require("./config/db");

// ✅ Import Routes
const newsRoutes = require("./routes/routes");
const authRoutes = require("./routes/auth.routes"); // NEW: Auth route

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ✅ Connect to DB
connectDatabase();

// ✅ Home Route - MongoDB Connection Check
app.get("/", (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 
        ? "✅ MongoDB Connected" 
        : "❌ MongoDB Not Connected";

    res.send(`<h2>Welcome to the News Aggregator API!</h2><p>${dbStatus}</p>`);
});

// ✅ Route Prefixing
app.use("/api", newsRoutes);     // /api/news
app.use("/api/auth", authRoutes); // /api/auth/signup, /api/auth/login

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
