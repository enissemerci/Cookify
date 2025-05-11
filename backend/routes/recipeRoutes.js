const express = require('express');
const router = express.Router();
const { createRecipe, getAllRecipes, searchRecipes, updateRecipe, deleteRecipe } = require('../controllers/recipeController');
const authenticateToken = require('../middleware/authMiddleware');
const { toggleFavorite } = require('../controllers/recipeController');
const { addComment, getComments } = require('../controllers/commentController');
const { deleteComment, updateComment } = require('../controllers/commentController');

// Yorum ekleme
router.post('/:recipeId/comments', authenticateToken, addComment);

// Yorumları listeleme
router.get('/:recipeId/comments', getComments);

// Yorum Sil
router.delete('/comments/:commentId', authenticateToken, deleteComment);

// Yorum Güncelle
router.put('/comments/:commentId', authenticateToken, updateComment);


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