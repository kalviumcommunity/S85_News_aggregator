const express = require("express");
const router = express.Router();
const News = require("../models/newsSchems"); // Import the News model

// Fetch all news articles (READ)
router.get("/news", async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Fetch a single news article by ID (READ)
router.get("/news/:id", async (req, res) => {
    try {
        const article = await News.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "News article not found" });
        }
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Add a new news article (CREATE)
router.post("/news", async (req, res) => {
    try {
        const { title, content, source, author, url, category, publishedAt } = req.body;
        const newArticle = new News({ title, content, source, author, url, category, publishedAt });
        await newArticle.save();
        res.status(201).json({ message: "News article added successfully", newArticle });
    } catch (error) {
        res.status(400).json({ message: "Error adding news article", error });
    }
});

// Update a news article by ID (UPDATE)
router.put("/news/:id", async (req, res) => {
    try {
        const updatedArticle = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedArticle) {
            return res.status(404).json({ message: "News article not found" });
        }
        res.json({ message: "News article updated successfully", updatedArticle });
    } catch (error) {
        res.status(400).json({ message: "Error updating news article", error });
    }
});

// Delete a news article by ID (DELETE)
router.delete("/news/:id", async (req, res) => {
    try {
        const deletedArticle = await News.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            return res.status(404).json({ message: "News article not found" });
        }
        res.json({ message: "News article deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting news article", error });
    }
});

module.exports = router;
