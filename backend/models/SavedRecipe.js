const mongoose = require('mongoose');

const SavedRecipeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Tarifi kaydeden kullanıcı
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true }, // Kaydedilen tarif
  savedAt: { type: Date, default: Date.now } // Kaydetme tarihi
});

const SavedRecipe = mongoose.model('SavedRecipe', SavedRecipeSchema);

module.exports = SavedRecipe;