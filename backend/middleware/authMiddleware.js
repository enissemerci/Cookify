const jwt = require('jsonwebtoken');

// JWT doğrulama middleware'i
const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log("🛡️ Token header geldi mi?", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("❌ Token yok veya format hatalı");
    return res.status(401).json({ message: 'Yetkisiz erişim, token gerekli' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token doğrulandı:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("❌ Token doğrulama başarısız:", err.message);
    return res.status(403).json({ message: 'Geçersiz veya süresi dolmuş token' });
  }
};

module.exports = authenticateToken;