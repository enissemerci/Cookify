const express = require('express');
const router = express.Router();
const { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe } = require('../controllers/recipeController');
const authenticateToken = require('../middleware/authMiddleware');

// Yeni tarif oluştur
router.post('/add', authenticateToken, createRecipe);

// Tarifleri listele (Bunun için /all yerine /recipes kullanıyoruz)
router.get('/', getAllRecipes);

// Belirli bir tarifi getir
router.get('/:recipeId', getRecipeById);

// Tarif güncelle
router.put('/:recipeId', authenticateToken, updateRecipe);

// Tarif sil
router.delete('/:recipeId', authenticateToken, deleteRecipe);

module.exports = router;