import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import { Button, Container, Typography, Box } from "@mui/material";

const Feed = () => {
  const [recipes, setRecipes] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Kullanıcının giriş yapıp yapmadığını takip ediyoruz
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/recipes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        //console.log("Tarifler:", res.data);

        // Tarifleri en son eklenene göre sıralıyoruz (azalan tarih sırasına göre)
        const sortedRecipes = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setRecipes(sortedRecipes);
      } catch (error) {
        console.error("Tarifler getirilirken bir hata oluştu", error.response || error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {!isAuthenticated ? (
        // Kullanıcı giriş yapmamışsa ekrana uyarı veriyoruz
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="error" gutterBottom>
            Tarifleri görebilmek için giriş yapmalısınız.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate("/login")}
          >
            Giriş Yap
          </Button>
        </Box>
      ) : (
        <>
          {/* Tarif Ekle Butonu */}
          <Box display="flex" justifyContent="center" mb={3}>
            <Button 
              variant="contained" 
              sx={{
                backgroundColor: "#f97316",
                "&:hover": { backgroundColor: "#c05614" },
                fontWeight: "bold"
              }} 
              onClick={() => navigate("/add-recipe")}
            >
              + Gönderi Paylaş
            </Button>
          </Box>

          {/* Tarifler */}
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <Box key={recipe._id} display="flex" justifyContent="center" mb={3}>
                <Box sx={{ maxWidth: 600, width: "100%" }}>
                  <RecipeCard recipe={recipe} />
                </Box>
              </Box>
            ))
          ) : (
            <Typography align="center" color="textSecondary">
              Henüz tarif bulunmamaktadır.
            </Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default Feed;