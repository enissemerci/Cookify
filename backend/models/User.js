const mongoose = require('mongoose');

// models/User.js
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: '' }, // Cloudinary URL
  bio: { type: String, default: '' },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SavedRecipe' }],
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }] // Tarifler alanı
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;