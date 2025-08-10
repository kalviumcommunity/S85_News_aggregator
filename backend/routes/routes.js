const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Fetch news based on user preferences using GNews
router.get('/news', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const preferences = user.preferences.length > 0 ? user.preferences : [];
    const gnewsApiKey = process.env.GNEWS_API_KEY;
    const keyword = req.query.q;
    let articles = [];
    if (keyword) {
      // If searching, just use the keyword
      const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(keyword)}&country=in&token=${gnewsApiKey}`;
      const response = await axios.get(url);
      articles = response.data.articles || [];
    } else if (preferences.length > 0) {
      // Fetch for each preference and merge
      const allArticles = [];
      for (const pref of preferences) {
        const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(pref)}&country=in&token=${gnewsApiKey}`;
        try {
          const response = await axios.get(url);
          if (Array.isArray(response.data.articles)) {
            allArticles.push(...response.data.articles);
          }
        } catch (err) {
          // Ignore errors for individual preferences
        }
      }
      // Deduplicate by article URL
      const seen = new Set();
      articles = allArticles.filter(article => {
        if (!article.url || seen.has(article.url)) return false;
        seen.add(article.url);
        return true;
      });
    } else {
      // Fallback to top headlines
      const url = `https://gnews.io/api/v4/top-headlines?country=in&token=${gnewsApiKey}`;
      const response = await axios.get(url);
      articles = response.data.articles || [];
    }
    res.json({ articles });
  } catch (err) {
    console.error('Error fetching news:', err);
    res.status(500).json({ message: 'Failed to fetch news', error: err.message });
  }
});

// Get all bookmarks for the logged-in user
router.get('/bookmarks', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ bookmarks: user.bookmarks });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookmarks', error: err.message });
  }
});

// Add a bookmark
router.post('/bookmarks', auth, async (req, res) => {
  try {
    const article = req.body.article;
    if (!article || !article.url) {
      return res.status(400).json({ message: 'Invalid article data' });
    }
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    // Prevent duplicate bookmarks by url
    if (user.bookmarks.some(b => b.url === article.url)) {
      return res.status(400).json({ message: 'Article already bookmarked' });
    }
    user.bookmarks.push(article);
    await user.save();
    res.json({ bookmarks: user.bookmarks });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add bookmark', error: err.message });
  }
});

// Remove a bookmark
router.delete('/bookmarks', auth, async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: 'Article url required' });
    }
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.bookmarks = user.bookmarks.filter(b => b.url !== url);
    await user.save();
    res.json({ bookmarks: user.bookmarks });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove bookmark', error: err.message });
  }
});

// Trending news endpoint
router.get('/trending', auth, async (req, res) => {
  try {
    const gnewsApiKey = process.env.GNEWS_API_KEY;
    const url = `https://gnews.io/api/v4/top-headlines?country=in&token=${gnewsApiKey}`;
    const response = await axios.get(url);
    res.json({ articles: response.data.articles });
  } catch (err) {
    console.error('Error fetching trending news:', err);
    res.status(500).json({ message: 'Failed to fetch trending news', error: err.message });
  }
});

module.exports = router; 