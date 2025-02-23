import React, { useState } from "react";
import foto from "../assets/foto.webp";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, Stack } from "@mui/material";
import { AccessTime, LocalDining, AddShoppingCart,CheckCircle } from "@mui/icons-material"; // İkonlar
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  const [openModal, setOpenModal] = useState(false); // Modal açma/kapama durumu
  const creationDate = new Date(recipe.createdAt).toLocaleDateString(); // Tarihi formatlamak için

  // Modal açma fonksiyonu
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Modal kapama fonksiyonu
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="recipe-card">
      {/* Kullanıcı Bilgileri */}
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

      {/* Tarifin Oluşturulma Tarihi */}
      <div className="creation-date">{creationDate}</div>

      {/* Yemek Fotoğrafı */}
      <img
        src={recipe.image || foto}
        alt={recipe.title}
        className="recipe-image"
      />

      {/* Tarif Bilgileri */}
      <h3 className="recipe-title">{recipe.title}</h3>
      <p className="recipe-description">{recipe.description}</p>

      {/* Beğeni ve Yorumlar */}
      <div className="likes-comments">
        <span className="like-icon">👍</span>
        <span>{recipe.likes.length} Beğeni</span>
        <span className="comment-icon">💬</span>
        <span>{recipe.comments.length} Yorum</span>
      </div>

      {/* Tarif Detaylarını Göster Butonu */}
      <Button
        variant="outlined"
        color="primary"
        onClick={handleOpenModal}
        sx={{ mt: 2 }}
      >
        Tarif Detayları
      </Button>

      {/* Modal - Tarif Detayları */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Tarif Detayları</DialogTitle>
        <DialogContent>
          <Box display="flex" gap={3}>
            {/* Yemek Fotoğrafı, Başlık ve Yazar Bilgileri */}
            <Box flex={1} className="modal-image">
              <img
                src={recipe.image || foto}
                alt={recipe.title}
                className="recipe-image-modal"
              />
              <Stack>
                <Typography variant="h6" className="recipe-title-modal">
                  {recipe.title}
                </Typography>
                <Typography variant="body2" className="author-name">
                  {recipe.author.username}
                </Typography>
              </Stack>
            </Box>

            {/* Tarif Detayları */}
            <Box flex={2}>
              <Typography variant="h6" gutterBottom>
                <AddShoppingCart sx={{ mr: 1 }} /> Malzemeler:
              </Typography>
              <div>
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <LocalDining sx={{ mr: 1 }} />
                    <span>{ingredient}</span>
                  </div>
                ))}
              </div>

              <Typography variant="h6" gutterBottom>
                <AccessTime sx={{ mr: 1 }} /> Yapılış Adımları:
              </Typography>
              <div>
                {recipe.steps.map((step, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <CheckCircle sx={{ mr: 1 }} />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RecipeCard;