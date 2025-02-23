const Recipe = require('../models/Recipe');  // Recipe modelini dahil et

// Yeni tarif oluşturma
const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps, image, category } = req.body;

    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      steps,
      image,
      category,
      author: req.user.id, // Giriş yapan kullanıcının id'si
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json({ message: 'Tarif başarıyla oluşturuldu!', savedRecipe });
  } catch (err) {
    res.status(400).json({ message: 'Tarif oluşturulurken bir hata oluştu', error: err });
  }
};

// Tarifleri listeleme
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
    .populate('author', 'username email profileImage')  // Sadece username, email ve profileImage'ı alıyoruz
    .exec();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(400).json({ message: 'Kullanıcılar listelenirken bir hata oluştu', error: err });
  }
};

// Tarif detaylarını bulma
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
      .populate('author', 'username profileImage')
      .populate('likes')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username profileImage' }
      });

    if (!recipe) return res.status(404).json({ message: 'Tarif bulunamadı' });
    
    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json({ message: 'Tarif bulunurken bir hata oluştu', error: err });
  }
};

// Tarif güncelleme
const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.recipeId, req.body, { new: true });
    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: 'Tarif güncellenirken bir hata oluştu', error: err });
  }
};

// Tarif silme
const deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.recipeId);
    if (!deletedRecipe) return res.status(404).json({ message: 'Tarif bulunamadı' });
    res.status(200).json({ message: 'Tarif başarıyla silindi' });
  } catch (err) {
    res.status(400).json({ message: 'Tarif silinirken bir hata oluştu', error: err });
  }
};

module.exports = { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe };