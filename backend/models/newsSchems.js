const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  source: { type: mongoose.Schema.Types.ObjectId, ref: "Source" },
  author: { type: String },
  url: { type: String, required: true, unique: true },
  category: { type: String },
  publishedAt: { type: Date, default: Date.now },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
});


const News = mongoose.model("News", newsSchema);
module.exports = News;
