const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary'); // Cloudinary ayarlarını içe aktar
const Recipe = require('../models/Recipe'); // Tarif modelini içe aktar

const router = express.Router();
const upload = multer({ storage });

// Tarifi resimle birlikte kaydetme endpoint'i
router.post('/', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Dosya yüklenemedi' });
    }

    try {
        const newRecipe = new Recipe({
            title: req.body.title, 
            description: req.body.description,
            ingredients: req.body.ingredients?.split(',') || [],
            steps: req.body.steps?.split(',') || [],
            image: req.file.path, // Cloudinary URL'si burada
            category: req.body.category,
            author: req.body.author // Kullanıcı ID'si
        });

        await newRecipe.save(); // MongoDB'ye kaydet
        res.json({ message: 'Tarif kaydedildi!', recipe: newRecipe });
    } catch (error) {
        res.status(500).json({ message: 'Tarif kaydedilemedi', error: error.message });
    }
});

module.exports = router;
