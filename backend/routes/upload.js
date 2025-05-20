const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');

const router = express.Router();
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Dosya bulunamadı' });
    }

    console.log("📷 Gelen dosya bilgisi:", req.file);

    const imageUrl = req.file.path || req.file.secure_url;

    if (!imageUrl) {
      return res.status(500).json({ message: 'Cloudinary URL alınamadı' });
    }

    res.json({ imageUrl });
  } catch (error) {
    console.error("❌ Resim yükleme hatası:", error);
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

module.exports = router; // ✅ BU SATIR MUTLAKA OLMALI
