import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";  
import { Avatar, Button, Grid, Typography, Paper, Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";  
import EditProfileModal from "../components/EditProfileModal";  
import EditRecipeModal from "../components/EditRecipeModal";  // Yeni modal'ı import et
import "./Profile.css";

const Profile = () => {
  const [recipes, setRecipes] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [isEditRecipeModalOpen, setIsEditRecipeModalOpen] = useState(false);  // Yeni state: EditRecipeModal
  const [recipeToEdit, setRecipeToEdit] = useState(null);  // Düzenlenmek istenen tarif
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);  // Silme onay modal'ı
  const [recipeToDelete, setRecipeToDelete] = useState(null);  // Silinecek tarif

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
  
        const userResponse = await axios.get("http://localhost:5001/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(userResponse.data);  // Kullanıcı bilgilerini kaydet
  
        const recipesResponse = await axios.get("http://localhost:5001/api/users/recipes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecipes(recipesResponse.data);  // Tarifleri kaydet
      } catch (err) {
        setError("Veriler alınırken hata oluştu.");
        console.error(err);
      }
    };
  
    fetchData();
  }, []);

  const handleEditProfile = (updatedUser) => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:5001/api/users/update/${userInfo._id}`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setUserInfo(response.data);
        setIsModalOpen(false); 
      })
      .catch((err) => {
        setError("Profili güncellerken bir hata oluştu");
        console.error(err);
      });
  };

  const handleEditRecipe = (updatedRecipe) => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:5001/api/recipes/${updatedRecipe._id}`, // Tarifin ID'si burada kullanılıyor
        updatedRecipe,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe._id === response.data._id ? response.data : recipe // Güncellenmiş tarifle eski tarifi değiştiriyoruz
          )
        );
        setIsEditRecipeModalOpen(false);  // Modalı kapatıyoruz
      })
      .catch((err) => {
        setError("Tarif güncellenirken bir hata oluştu");
        console.error(err);
      });
  };

  const handleDeleteRecipe = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:5001/api/recipes/${recipeToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe._id !== recipeToDelete._id)
        );
        setIsDeleteDialogOpen(false);
      })
      .catch((err) => {
        setError("Tarif silinirken bir hata oluştu");
        console.error(err);
      });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Profilim</Typography>
      {error && <Typography color="error">{error}</Typography>}

      <Paper sx={{ padding: 2, display: 'flex', alignItems: 'center', marginBottom: 3 }}>
        <Avatar
          alt={userInfo.username}
          src={userInfo.profileImage || "defaultProfilePic.jpg"} 
          sx={{ width: 100, height: 100, marginRight: 3 }}
        />
        <div>
          <Typography variant="h6">{userInfo.username}</Typography>
          <Typography variant="body1">{userInfo.email}</Typography>
          <Typography variant="body2" color="text.secondary">{userInfo.bio}</Typography>
        </div>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ marginLeft: "auto", boxShadow: 2, borderRadius: 2, padding: "8px 16px", backgroundColor: "#ff6600", '&:hover': { backgroundColor: "#ff4500" }}} 
          onClick={() => setIsModalOpen(true)}
        >
          Düzenle
        </Button>
      </Paper>

      <EditProfileModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userInfo={userInfo}
        onSave={handleEditProfile}
      />

      <Typography variant="h5" gutterBottom>Tariflerim</Typography>
      {recipes.length > 0 ? (
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe._id}>
              <RecipeCard recipe={recipe} />
              <Button variant="outlined" onClick={() => { setRecipeToEdit(recipe); setIsEditRecipeModalOpen(true); }}>
                Düzenle
              </Button>
              <Button variant="outlined" color="error" onClick={() => { setRecipeToDelete(recipe); setIsDeleteDialogOpen(true); }}>
                Sil
              </Button>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>Henüz tarifiniz yok.</Typography>
      )}

      {/* Tarif Güncelleme Modalı */}
      <EditRecipeModal
        open={isEditRecipeModalOpen}
        onClose={() => setIsEditRecipeModalOpen(false)}
        recipe={recipeToEdit}
        onSave={handleEditRecipe}
      />

      {/* Tarif Silme Onay Modalı */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Tarif Silme</DialogTitle>
        <DialogContent>
          <Typography>Bu tarifi silmek istediğinizden emin misiniz?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)} color="primary">
            İptal
          </Button>
          <Button onClick={handleDeleteRecipe} color="error">
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;