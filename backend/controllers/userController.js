const User = require('../models/User');  // User modelini dahil et
const bcrypt = require('bcryptjs'); // bcryptjs'i dahil et
const jwt = require('jsonwebtoken'); // jsonwebtoken'i dahil et
const Recipe = require("../models/Recipe");

// Kullanıcı oluşturma
const createUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Şifreyi hash'le
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Kullanıcıyı oluştur
      const newUser = new User({
        username,
        email,
        password: hashedPassword,  // Şifreyi hash'lenmiş olarak kaydet
      });
  
      await newUser.save();
      res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi!', newUser });
    } catch (err) {
      res.status(400).json({ message: 'Kullanıcı oluşturulurken bir hata oluştu', error: err });
    }
  };

// Kullanıcıyı güncelleme
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: 'Kullanıcı güncellenirken bir hata oluştu', error: err });
  }
};

// Kullanıcıyı bulma
const findUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Kullanıcı bulunurken bir hata oluştu', error: err });
  }
};

// Tüm kullanıcıları listeleme
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(400).json({ message: 'Kullanıcılar listelenirken bir hata oluştu', error: err });
    }
  };



  // Kullanıcı girişi (login)
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Kullanıcıyı email ile bul
      const user = await User.findOne({ email });
      
      if (!user) return res.status(400).json({ message: 'Kullanıcı bulunamadı', });
  
      // Şifreyi kontrol et
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Geçersiz şifre' });
  
      // JWT token oluştur
      const token = jwt.sign(
        { id: user._id, username: user.username }, // Payload: kullanıcının id'si ve username'i
        process.env.JWT_SECRET, // JWT sırrı, .env dosyasından alınmalı
        { expiresIn: '1h' } // Token'in geçerlilik süresi
      );
  
      res.status(200).json({ message: 'Giriş başarılı', token});
    } catch (err) {
      res.status(400).json({ message: 'Giriş yapılırken bir hata oluştu', error: err });
    }
  };
  


const getUserRecipes = async (req, res) => {
  try {
    const userId = req.user.id;  // Giriş yapan kullanıcının ID'si alınır
    const recipes = await Recipe.find({ author: userId })  // Giriş yapan kullanıcıya ait tarifleri getir
      .populate("author", "username email profileImage")
      .exec();
    
    if (recipes.length === 0) {
      return res.status(404).json({ message: "Hiç tarif bulunamadı" });
    }

    res.status(200).json(recipes);
  } catch (err) {
    res
      .status(400)
      .json({
        message: "Tarifler listelenirken bir hata oluştu",
        error: err,
      });
  }
};

module.exports = { createUser, updateUser, findUserByEmail,loginUser,getAllUsers,getUserRecipes};