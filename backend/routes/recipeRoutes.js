const express = require('express');
const router = express.Router();
const { createRecipe, getAllRecipes, searchRecipes, updateRecipe, deleteRecipe } = require('../controllers/recipeController');
const authenticateToken = require('../middleware/authMiddleware');
const { toggleFavorite } = require('../controllers/recipeController');

// Yeni tarif oluştur
router.post('/add', authenticateToken, createRecipe);

// Tarif beğenme
router.post('/:recipeId/favorite', authenticateToken, toggleFavorite);

// Tarifleri listele (Bunun için /all yerine /recipes kullanıyoruz)
router.get('/', getAllRecipes);

// Belirli bir tarifi getir


// Tarif güncelle
router.put('/:recipeId', authenticateToken, updateRecipe);

// Tarif sil
router.delete('/:recipeId', authenticateToken, deleteRecipe);
router.get('/search', searchRecipes);


module.exports = router;