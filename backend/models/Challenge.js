const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String, required: true }], // Kullanılacak malzemeler
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Katılan kullanıcılar
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Kazanan kullanıcı
  deadline: { type: Date, required: true }, // Meydan okuma süresi
}, { timestamps: true });

module.exports = mongoose.model('Challenge', ChallengeSchema);