const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware'); // Middleware'i dahil et

// Herkese açık route'lar
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/', userController.getAllUsers);

// Korumalı route'lar
router.put('/update/:userId', authenticateToken, userController.updateUser);
router.get('/find/:email', authenticateToken, userController.findUserByEmail);

module.exports = router;