const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's name
  email: { type: String, required: true, unique: true }, // Must be unique
  password: { type: String, required: true }, // Will be hashed before saving
});

// 🔐 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password changed
  this.password = await bcrypt.hash(this.password, 10); // Hash with salt rounds = 10
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
