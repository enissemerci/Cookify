const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware'); // Middleware'i dahil et
const { getFavoriteRecipes } = require('../controllers/userController');

// Herkese açık route'lar
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/', userController.getAllUsers);

// Kullanıcının beğendiği tarifleri getir
router.get('/favorites', authenticateToken, getFavoriteRecipes);

// Korumalı route'lar
router.put('/update/:userId', authenticateToken, userController.updateUser);
router.get('/find/:email', authenticateToken, userController.findUserByEmail);

router.get("/recipes", authenticateToken, userController.getUserRecipes);//aynı zamanda kullancı bilgierlini de alıyorum profilde
router.get("/me", authenticateToken, userController.getUserInfo);//aynı zamanda kullancı bilgierlini de alıyorum profilde
module.exports = router;