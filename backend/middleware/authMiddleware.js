const jwt = require('jsonwebtoken');

// JWT doğrulama middleware'i
const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Yetkisiz erişim, token gerekli' });
  }

  // "Bearer <token>" formatından token'ı ayır
  const token = authHeader.split(' ')[1];

  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Kullanıcı bilgisini request'e ekle
    next(); // Middleware'i geç
  } catch (err) {
    return res.status(403).json({ message: 'Geçersiz veya süresi dolmuş token' });
  }
};

module.exports = authenticateToken;