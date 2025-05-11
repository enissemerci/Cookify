const express = require('express');
const router = express.Router();
const {
  addComment,
  getComments,
  deleteComment,
  updateComment,
  getUserComments,
} = require('../controllers/commentController');
const authenticateToken = require('../middleware/authMiddleware');

// Yorum ekleme /api/comments/:recipeId/comments
router.post('/:recipeId/comments', authenticateToken, addComment);

// Belirli tarifin yorumlarını çek
router.get('/:recipeId/comments', getComments);

// Yorum silme
router.delete('/comments/:commentId', authenticateToken, deleteComment);

// Yorum güncelleme
router.put('/comments/:commentId', authenticateToken, updateComment);

// Giriş yapan kullanıcının yorumları
router.get('/my/comments', authenticateToken, getUserComments);

module.exports = router;