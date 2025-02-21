const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Beğenen kullanıcı
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true }, // Beğenilen tarif
  createdAt: { type: Date, default: Date.now } // Beğeni tarihi
});

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;