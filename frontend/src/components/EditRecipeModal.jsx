import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import CATEGORIES from "../constants/categories"; // aynı dosyadan al



const EditRecipeModal = ({ open, onClose, recipe, onSave }) => {
  const [updatedRecipe, setUpdatedRecipe] = useState({
    title: "",
    description: "",
    ingredients: [],
    steps: [],
    image: "",
    category: "",
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (recipe) {
      setUpdatedRecipe({
        title: recipe.title || "",
        description: recipe.description || "",
        ingredients: recipe.ingredients || [],
        steps: recipe.steps || [],
        image: recipe.image || "",
        category: recipe.category || "",
        _id: recipe._id,
      });
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data?.imageUrl) {
        setUpdatedRecipe((prev) => ({ ...prev, image: data.imageUrl }));
      } else {
        alert("Resim yüklenemedi.");
      }
    } catch (err) {
      alert("Resim yüklenemedi.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    const { _id, title, description, ingredients, steps } = updatedRecipe;

    if (!_id) return alert("Tarif ID'si bulunamadı!");
    if (!title || !description) return alert("Tarif adı ve açıklaması boş olamaz!");

    const updatedData = {
      ...updatedRecipe,
      ingredients: Array.isArray(ingredients) ? ingredients : ingredients.split(","),
      steps: Array.isArray(steps) ? steps : steps.split(","),
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Giriş yapmanız gerekli!");

      const response = await fetch(`http://localhost:5001/api/recipes/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        onSave(updatedData);
        onClose();
      } else {
        alert("Tarif güncellenemedi.");
      }
    } catch (error) {
      console.error("Güncelleme hatası:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 3,
          maxWidth: 400,
          margin: "auto",
          backgroundColor: "white",
          marginTop: "10%",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">Tarifi Düzenle</Typography>

        <TextField
          label="Tarif Adı"
          name="title"
          value={updatedRecipe.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Tarif İçeriği"
          name="description"
          value={updatedRecipe.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Malzemeler (Virgülle Ayırın)"
          name="ingredients"
          value={updatedRecipe.ingredients.join(",")}
          onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, ingredients: e.target.value.split(",") })}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Yapılış Adımları (Virgülle Ayırın)"
          name="steps"
          value={updatedRecipe.steps.join(",")}
          onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, steps: e.target.value.split(",") })}
          fullWidth
          margin="normal"
        />

        {/* YENİ RESİM YÜKLEME */}
        <input
          type="file"
          accept="image/*"
          id="edit-upload"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) handleImageUpload(file);
          }}
        />
        <label htmlFor="edit-upload">
          <Button
            variant="outlined"
            component="span"
            disabled={uploading}
            fullWidth
            sx={{ mt: 2 }}
          >
            {uploading ? "Yükleniyor..." : "Yeni Resim Yükle"}
          </Button>
        </label>

        {updatedRecipe.image && (
          <Typography variant="body2" sx={{ mt: 1, wordBreak: "break-word" }}>
            Yüklenen Resim: {updatedRecipe.image}
          </Typography>
        )}

        <TextField
          select
          label="Kategori Seç"
          name="category"
          value={updatedRecipe.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {CATEGORIES.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}

        </TextField>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          sx={{ mt: 2 }}
        >
          Kaydet
        </Button>
      </Box>
    </Modal>
  );
};

export default EditRecipeModal;
