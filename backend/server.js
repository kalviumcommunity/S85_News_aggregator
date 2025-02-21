require("dotenv").config(); // Load environment variables at the top
const express = require("express");
const connectDB = require("./config/db"); // Ensure correct path
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, I am Gagan. This is my project News Aggregator");
});

// Check MongoDB connection status
app.get("/home", (req, res) => {
  const status =
    mongoose.connection.readyState === 1
      ? "Connected to MongoDB"
      : "Disconnected from MongoDB";
  res.json({ status });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
