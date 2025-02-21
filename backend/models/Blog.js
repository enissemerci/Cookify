const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Beğenen kullanıcılar
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Blog yorumları
  coverImage: { type: String, default: '' }, // Blog kapak görseli (Cloudinary URL)
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);