const express = require('express');
const connectDB = require('./config/connectDatabase'); 
const userRoutes = require('./routes/userRoutes'); 
const recipeRoutes = require('./routes/recipeRoutes');
const uploadRoutes = require('./routes/upload');
const sliderDishRoutes = require("./routes/sliderDishRoutes");
const commentRoutes = require("./routes/commentRoutes");
const cors = require('cors');

const app = express();
app.use(express.json()); 
require('dotenv').config();
connectDB();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

// API Routes
app.use('/api/users', userRoutes); 
app.use('/api/recipes', recipeRoutes);
app.use('/api/upload', uploadRoutes);
app.use("/api/sliderDishes", sliderDishRoutes);
app.use("/api/comments", commentRoutes);

console.log("✅ Tüm routerlar başarıyla yüklendi!");

// Basit bir test endpoint'i
app.get('/', (req, res) => {
  res.send('MongoDB Bağlantısı Başarıyla Yapıldı!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server çalışıyor, port: ${PORT}`);
});