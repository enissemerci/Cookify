const Recipe = require("../models/Recipe"); // Recipe modelini dahil et

// Yeni tarif oluşturma
const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps, image, category } =
      req.body;

    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      steps,
      image,
      category,
      author: req.user.id, // Giriş yapan kullanıcının ID'si burada alınır
    });

    const savedRecipe = await newRecipe.save();
    res
      .status(201)
      .json({ message: "Tarif başarıyla oluşturuldu!", savedRecipe });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Tarif oluşturulurken bir hata oluştu", error: err });
  }
};

// Tarifleri listeleme
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("author", "username email profileImage") 
      .exec();
    res.status(200).json(recipes);
  } catch (err) {
    res
      .status(400)
      .json({
        message: "Kullanıcılar listelenirken bir hata oluştu",
        error: err,
      });
  }
};

const removeUnits = (text) => {
  return text
    .toLowerCase()
    .replace(/\b\d+\s?(ml|cl|gr|g|kg|l|litre|adet|yemek kaşığı|çay kaşığı|tatlı kaşığı|bardak|su bardağı|tutam|çimdik|küçük|büyük)\b/g, '')
    .replace(/\d+/g, '') // sayıları temizle
    .replace(/\s{2,}/g, ' ') // çift boşlukları sadeleştir
    .trim();
};

const searchRecipes = async (req, res) => {
  const { ingredients } = req.query;

  const rawIngredients = ingredients.split(',').map(i => i.trim().toLowerCase());
  const cleanedSearch = rawIngredients.map(removeUnits); // normalize edilmiş arama

  try {
    const allRecipes = await Recipe.find();

    // Her tarifin malzemeleri normalize ediliyor ve karşılaştırılıyor
    const filtered = allRecipes.filter(recipe => {
      const cleanedIngredients = recipe.ingredients.map(removeUnits);
      return cleanedSearch.every(searchItem =>
        cleanedIngredients.some(ing => ing.includes(searchItem))
      );
    });

    res.json(filtered);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Tarifler bulunamadı!" });
  }
};


// Tarif güncelleme
const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedRecipe);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Tarif güncellenirken bir hata oluştu", error: err });
  }
};

// Tarif silme
const deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.recipeId);
    if (!deletedRecipe)
      return res.status(404).json({ message: "Tarif bulunamadı" });
    res.status(200).json({ message: "Tarif başarıyla silindi" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Tarif silinirken bir hata oluştu", error: err });
  }
};

const toggleFavorite = async (req, res) => {
  try {
      const recipeId = req.params.recipeId;
      const userId = req.user.id;

      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
          return res.status(404).json({ message: 'Tarif bulunamadı' });
      }

      const isLiked = recipe.likes.includes(userId);

      if (isLiked) {
          // Beğeniyi kaldır
          recipe.likes = recipe.likes.filter(id => id.toString() !== userId.toString()); 
      } else {
          // Beğeni ekle
          recipe.likes.push(userId); 
      }

      // Veritabanını kaydediyoruz
      await recipe.save();

      // Güncellenmiş veriyi frontend'e gönder
      res.status(200).json({ 
          message: 'Favori durumu güncellendi', 
          isLiked: !isLiked, // Yeni beğeni durumunu frontend'e gönder
          likesCount: recipe.likes.length // Güncellenmiş beğeni sayısını gönder
      });

  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: 'İşlem başarısız', error });
  }
};





module.exports = {
  createRecipe,
  getAllRecipes,
  searchRecipes,
  updateRecipe,
  deleteRecipe,
  toggleFavorite,
};
