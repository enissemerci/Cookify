const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true }, // Yorum içeriği
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Yorumu yapan kullanıcı
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe", required: true },
    createdAt: { type: Date, default: Date.now } // Yorumun zamanı
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;