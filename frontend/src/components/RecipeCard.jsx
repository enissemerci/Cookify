import React, { useState, useEffect } from "react";
import axios from "axios";
import foto from "../assets/foto.webp";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  AccessTime,
  LocalDining,
  AddShoppingCart,
  CheckCircle,
} from "@mui/icons-material";
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  const [openModal, setOpenModal] = useState(false);
  const [likes, setLikes] = useState(recipe.likes.length); // Beğeni sayısını al
  const [isLiked, setIsLiked] = useState(false); // Kullanıcı beğenmiş mi?
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token"); // Kullanıcı token'ı al

  // İlk render'da kullanıcının beğenip beğenmediğini kontrol et
  useEffect(() => {
    const checkIfLiked = () => {
      const liked = recipe.likes.some((likeId) => likeId === userId);
      setIsLiked(liked);
    };

    if (userId && recipe.likes) {
      checkIfLiked();
    }
  }, [recipe.likes, userId]); // Likes ve userId'ye odaklanıyoruz

  const handleFavorite = async () => {
    if (!token) {
      alert("Beğenmek için giriş yapmalısınız!");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5001/api/recipes/${recipe._id}/favorite`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsLiked(res.data.isLiked); // Favori durumu güncelle
      setLikes(res.data.likesCount); // Beğeni sayısını güncelle
    } catch (error) {
      console.error("Beğenme işlemi başarısız:", error.response || error);
    }
  };

  return (
    <div className="recipe-card">
      <div className="user-info">
        <img
          src={recipe.author.profileImage || foto}
          alt={recipe.author.username}
          className="profile-img"
        />
        <div className="user-details">
          <span className="username">{recipe.author.username}</span>
          <span className="email">{recipe.author.email}</span>
        </div>
      </div>
      <div className="creation-date">
        {new Date(recipe.createdAt).toLocaleDateString()}
      </div>

      <img
        src={recipe.image || foto}
        alt={recipe.title}
        className="recipe-image"
      />

      <h3 className="recipe-title">{recipe.title}</h3>
      <p className="recipe-description">{recipe.description}</p>

      {/* Beğeni ve Yorumlar */}
      <div className="likes-comments">
        <Button
          onClick={handleFavorite}
          sx={{ color: isLiked ? "red" : "gray" }}
        >
          {isLiked ? (
            <Favorite />
          ) : (
            <FavoriteBorder />
          )}
          {likes} Beğeni
        </Button>
      </div>

      <Button
        variant="outlined"
        color="primary"
        onClick={() => setOpenModal(true)}
        sx={{ mt: 2 }}
      >
        Tarif Detayları
      </Button>

      {/* Tarif Detayları Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Tarif Detayları</DialogTitle>
        <DialogContent>
          <Box display="flex" gap={3}>
            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                <AddShoppingCart sx={{ mr: 1 }} /> Malzemeler:
              </Typography>
              <div>
                {recipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <LocalDining sx={{ mr: 1 }} />
                    <span>{ingredient}</span>
                  </div>
                ))}
              </div>
            </Box>

            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                <AccessTime sx={{ mr: 1 }} /> Yapılış Adımları:
              </Typography>
              <div>
                {recipe.steps.map((step, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <CheckCircle sx={{ mr: 1 }} />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RecipeCard;