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
  TextField,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  AccessTime,
  LocalDining,
  AddShoppingCart,
  CheckCircle,
  Comment as CommentIcon,
} from "@mui/icons-material";
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  const [openModal, setOpenModal] = useState(false);
  const [likes, setLikes] = useState(recipe.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  useEffect(() => {
    const checkIfLiked = () => {
      const liked = recipe.likes.some((likeId) => likeId === userId);
      setIsLiked(liked);
    };

    if (userId && recipe.likes) {
      checkIfLiked();
    }
  }, [recipe.likes, userId]);

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
      setIsLiked(res.data.isLiked);
      setLikes(res.data.likesCount);
    } catch (error) {
      console.error("Beğenme işlemi başarısız:", error.response || error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:5001/api/comments/comments/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (error) {
      console.error("Yorum silinemedi:", error.response || error);
    }
  };

  const handleEditComment = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5001/api/comments/comments/${commentToEdit._id}`,
        { text: editedCommentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prev) =>
        prev.map((c) => (c._id === res.data.comment._id ? res.data.comment : c))
      );
      setCommentToEdit(null);
      setEditedCommentText("");
    } catch (err) {
      console.error("Yorum güncellenemedi", err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/comments/${recipe._id}/comments`
      );
      setComments(res.data);
    } catch (error) {
      console.error("Yorumlar alınamadı:", error.response || error);
    }
  };

  const handleOpenModal = async () => {
    await fetchComments();
    setOpenModal(true);
  };

  const handleCommentSubmit = async () => {
    if (!token) {
      alert("Yorum yazmak için giriş yapmalısınız!");
      return;
    }
    if (newComment.trim() === "") return;

    try {
      const res = await axios.post(
        `http://localhost:5001/api/comments/${recipe._id}/comments`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([res.data.comment, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Yorum gönderilemedi:", error.response || error);
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

      <div className="likes-comments">
        <Button
          onClick={handleFavorite}
          sx={{ color: isLiked ? "red" : "gray" }}
        >
          {isLiked ? <Favorite /> : <FavoriteBorder />}
          {likes} Beğeni
        </Button>

        <Button onClick={handleOpenModal} sx={{ color: "#555" }}>
          <CommentIcon sx={{ mr: 1 }} />
          Yorumlar
        </Button>
      </div>

      <Button
        variant="outlined"
        color="primary"
        onClick={handleOpenModal}
        sx={{ mt: 2 }}
      >
        Tarif Detayları
      </Button>

      {/* Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Tarif Detayları</DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            gap={3}
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                <AddShoppingCart sx={{ mr: 1 }} /> Malzemeler:
              </Typography>
              {recipe.ingredients.map((ingredient, index) => (
                <Box key={index} display="flex" alignItems="center" mb={1}>
                  <LocalDining sx={{ mr: 1 }} />
                  <span>{ingredient}</span>
                </Box>
              ))}
            </Box>

            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                <AccessTime sx={{ mr: 1 }} /> Yapılış Adımları:
              </Typography>
              {recipe.steps.map((step, index) => (
                <Box key={index} display="flex" alignItems="center" mb={1}>
                  <CheckCircle sx={{ mr: 1 }} />
                  <span>{step}</span>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Yorumlar Bölümü */}
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              <CommentIcon sx={{ mr: 1 }} /> Yorumlar:
            </Typography>

            {/* Yorum Yaz */}
            <Box display="flex" gap={2} mb={2}>
              <TextField
                fullWidth
                label="Yorumunuzu yazın"
                variant="outlined"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button variant="contained" onClick={handleCommentSubmit}>
                Gönder
              </Button>
            </Box>

            {/* Yorum Listesi */}
            {comments.length > 0 ? (
              comments.map((c) => (
                <Box
                  key={c._id}
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  mb={2}
                  p={2}
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: "10px",
                    borderLeft: "4px solid #f97316",
                  }}
                >
                  {/* Sol: Profil Foto + Kullanıcı Bilgisi */}
                  <Box display="flex" alignItems="center" gap={2}>
                    <img
                      src={c.author.profileImage || foto}
                      alt={c.author.username}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid tomato",
                      }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {c.author.username}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {c.author.email}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Sağ: Tarih ve Yorum + DÜZENLE/SİL */}
                  <Box flex={1} ml={2}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      align="right"
                      sx={{ float: "right" }}
                    >
                      {new Date(c.createdAt).toLocaleDateString("tr-TR")}
                    </Typography>
                    <Typography variant="body1" mt={2}>
                      {c.text}
                    </Typography>

                    {/* 🔽 SAHİBİYSE BUTONLAR */}
                    {c.author._id === userId && (
                      <Box sx={{ mt: 1, textAlign: "right" }}>
                        <Button
                          size="small"
                          onClick={() => {
                            setCommentToEdit(c);
                            setEditedCommentText(c.text);
                          }}
                        >
                          Düzenle
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleDeleteComment(c._id)}
                        >
                          Sil
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
              ))
            ) : (
              <Typography>Henüz yorum yok.</Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={!!commentToEdit} onClose={() => setCommentToEdit(null)}>
        <DialogTitle>Yorumu Düzenle</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            value={editedCommentText}
            onChange={(e) => setEditedCommentText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCommentToEdit(null)}>İptal</Button>
          <Button onClick={handleEditComment} color="primary">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RecipeCard;
