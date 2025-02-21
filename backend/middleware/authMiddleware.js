const jwt = require('jsonwebtoken');

// JWT doğrulama middleware'i
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // "Bearer <token>" formatında gelir

  if (!token) return res.status(401).json({ message: 'Token gerekli' });

  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Kullanıcı bilgisini request'e ekle
    next(); // Middleware'i geç
  } catch (err) {
    res.status(403).json({ message: 'Geçersiz token' });
  }
};

module.exports = authenticateToken;