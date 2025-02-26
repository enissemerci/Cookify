import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button, MenuItem } from "@mui/material";

const categories = [
  "Tatlı",
  "Ana Yemek",
  "Aperatif",
  "İçecek",
  "Kahvaltı",
  "Vejetaryen",
  "Vegan",
];

const EditRecipeModal = ({ open, onClose, recipe, onSave }) => {
  const [updatedRecipe, setUpdatedRecipe] = useState({
    title: recipe?.title || "",
    description: recipe?.description || "",
    ingredients: recipe?.ingredients || [],
    steps: recipe?.steps || [],
    image: recipe?.image || "", // Yalnızca tarif görseli güncellenir
    category: recipe?.category || "",
  });

  useEffect(() => {
    if (recipe) {
      setUpdatedRecipe({
        title: recipe.title || "",
        description: recipe.description || "",
        ingredients: recipe.ingredients || [],
        steps: recipe.steps || [],
        image: recipe.image || "", // Eski görseli koruma
        category: recipe.category || "",
        _id: recipe._id, // ID kaybolmasın
      });
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { _id, title, description, ingredients, steps } = updatedRecipe;

    if (!_id) {
      alert("Tarif ID'si bulunamadı!");
      return;
    }

    if (!title || !description) {
      alert("Tarif adı ve açıklaması boş olamaz!");
      return;
    }

    const updatedData = {
      ...updatedRecipe,
      ingredients: Array.isArray(updatedRecipe.ingredients)
        ? updatedRecipe.ingredients
        : updatedRecipe.ingredients.split(", "),
      steps: Array.isArray(updatedRecipe.steps)
        ? updatedRecipe.steps
        : updatedRecipe.steps.split(", "),
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Kullanıcı girişi yapılmamış!");
        return;
      }

      const response = await fetch(`http://localhost:5001/api/recipes/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        onSave(updatedData); // Güncellenmiş veriyi profile sayfasına gönder
        onClose();
      } else {
        alert("Tarif güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
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
          value={updatedRecipe.ingredients.join(", ")}
          onChange={(e) =>
            setUpdatedRecipe({ ...updatedRecipe, ingredients: e.target.value.split(", ") })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Yapılış Adımları (Virgülle Ayırın)"
          name="steps"
          value={updatedRecipe.steps.join(", ")}
          onChange={(e) =>
            setUpdatedRecipe({ ...updatedRecipe, steps: e.target.value.split(", ") })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Resim URL"
          name="image"
          value={updatedRecipe.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Kategori Seç"
          name="category"
          value={updatedRecipe.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {categories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginTop: 2 }}
        >
          Kaydet
        </Button>
      </Box>
    </Modal>
  );
};

export default EditRecipeModal;