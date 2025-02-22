const express = require('express');
const connectDB = require('./config/connectDatabase'); // connectDatabase.js dosyasını doğru yoldan çağırın
const userRoutes = require('./routes/userRoutes'); // User routes dosyasını dahil et
const recipeRoutes = require('./routes/recipeRoutes');

const cors = require('cors');

const app = express();
app.use(express.json()); // JSON verilerini alabilmek için

// .env dosyasını yüklemek için
require('dotenv').config();

// MongoDB'ye bağlan
connectDB();

app.use(cors({
  origin: 'http://localhost:5173', // Frontend cors kabul ediyor
  credentials: true
}));
//users
app.use('/api/users', userRoutes); 
//recipes
app.use('/api/recipes', recipeRoutes);
// Basit bir test endpoint'i ekleyin
app.get('/', (req, res) => {
  res.send('MongoDB Bağlantısı Başarıyla Yapıldı!');
});
// Uygulamayı başlat
const PORT = process.env.PORT || 5001; // 5001 gibi başka bir port kullanabilirsiniz
app.listen(PORT, () => {
  console.log(`Server çalışıyor, port: ${PORT}`);
});