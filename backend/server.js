const express = require('express');
const connectDB = require('./config/connectDatabase'); // connectDatabase.js dosyasını doğru yoldan çağırın

const app = express();

// .env dosyasını yüklemek için
require('dotenv').config();

// MongoDB'ye bağlan
connectDB();

// Basit bir test endpoint'i ekleyin
app.get('/', (req, res) => {
  res.send('MongoDB Bağlantısı Başarıyla Yapıldı!');
});
// Uygulamayı başlat
const PORT = process.env.PORT || 5001; // 5001 gibi başka bir port kullanabilirsiniz
app.listen(PORT, () => {
  console.log(`Server çalışıyor, port: ${PORT}`);
});