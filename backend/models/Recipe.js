const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },  // Tarif adı
  description: { type: String, required: true }, // Açıklama
  ingredients: [{ type: String, required: true }], // Malzemeler
  steps: [{ type: String, required: true }], // Yapılış adımları
  image: { type: String, default: '' }, // Cloudinary URL
  category: { type: String, enum: ['Tatlı', 'Ana Yemek', 'Atıştırmalık', 'İçecek', 'Diğer'], required: true }, // Kategori
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }], // Beğeniler
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Yorumlar
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Tarifin sahibi
  challenge: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', default: null } // Eğer meydan okuma tarifiyse
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;