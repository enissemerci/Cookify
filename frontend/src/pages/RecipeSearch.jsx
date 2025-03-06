import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import SearchCard from "../components/SearchCard";
import { useLocation } from "react-router-dom";

const RecipeSearch = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialIngredients = searchParams.get("ingredients") || "";

  const [ingredients, setIngredients] = useState(initialIngredients);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  // İlk render'da ingredients varsa API çağrısı yap
  useEffect(() => {
    if (initialIngredients) {
      fetchRecipes(initialIngredients);
    }
  }, []);

  const fetchRecipes = async (query) => {
    const searchQuery = query || ingredients;
    if (!searchQuery.trim()) {
      alert("Lütfen malzemeleri girin.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/recipes/search?ingredients=${searchQuery}`);
      if (!response.ok) throw new Error("API hatası");

      const data = await response.json();
      setRecipes(data);
      setError(null);
    } catch (error) {
      console.error("Tarifler alınamadı:", error);
      setError("Tarifler alınırken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f4f9" }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2 }}>
        Tarif Ara
      </Typography>

      {/* Malzeme Arama Alanı */}
      <TextField
        variant="outlined"
        label="Malzemeleri virgülle ayırarak girin"
        fullWidth
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        sx={{ marginBottom: 2, "& .MuiOutlinedInput-root": { borderRadius: 4 } }}
      />

      {/* Ara Butonu */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => fetchRecipes()}
        sx={{ display: "block", width: "100%", backgroundColor: "#f97316", "&:hover": { backgroundColor: "#c05614" } }}
      >
        Ara
      </Button>

      {/* Hata Mesajı */}
      {error && <Typography sx={{ color: "red", textAlign: "center", marginTop: 2 }}>{error}</Typography>}

      {/* Tariflerin Listelendiği Kısım */}
      <Box sx={{ marginTop: 4 }}>
        {recipes.length === 0 && !error ? (
          <Typography variant="h6" color="textSecondary" align="center">
            Malzemelere uygun tarif bulunamadı.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
              marginTop: 2,
            }}
          >
            {recipes.map((recipe) => (
              <SearchCard key={recipe._id} recipe={recipe} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RecipeSearch;