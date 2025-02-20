const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB bağlantı stringini .env dosyasından alıyoruz.
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Eğer bağlantı hatası varsa, uygulama sonlanır.
  }
};

module.exports = connectDB;