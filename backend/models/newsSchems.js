const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },  // News title
  content: { type: String, required: true }, // Full article content
  source: { type: String, required: true }, // News source (e.g., BBC, CNN)
  author: { type: String }, // Author name (if available)
  url: { type: String, required: true, unique: true }, // Source URL for the news
  category: { type: String }, // Category (e.g., Technology, Sports, Politics)
  publishedAt: { type: Date, default: Date.now }, // Date of publication
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

});

const News = mongoose.model("News", newsSchema);
module.exports = News;
