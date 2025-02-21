const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Kullanıcı oluşturma
router.post('/register', userController.createUser);

// Kullanıcı güncelleme
router.put('/update/:userId', userController.updateUser);

// Email ile kullanıcı bulma
router.get('/find/:email', userController.findUserByEmail);

// Kullanıcı girişi (login) - Login fonksiyonu da eklenmeli
router.post('/login', userController.loginUser);

// Tüm kullanıcıları listeleme
router.get('/', userController.getAllUsers);


module.exports = router;