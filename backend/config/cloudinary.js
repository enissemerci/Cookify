const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

require('dotenv').config();

// Cloudinary konfigürasyonu
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer için Cloudinary depolama ayarları
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'cookify', // Yüklenen dosyaların gideceği klasör
        allowed_formats: ['jpeg', 'png', 'jpg', 'webp']

    }
});

module.exports = { cloudinary, storage };
