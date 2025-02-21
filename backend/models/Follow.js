const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema({
  follower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Takip eden kullanıcı
  following: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Takip edilen kullanıcı
  createdAt: { type: Date, default: Date.now } // Takip tarihi
});

const Follow = mongoose.model('Follow', FollowSchema);

module.exports = Follow;