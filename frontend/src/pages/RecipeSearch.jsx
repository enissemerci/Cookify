import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import SearchCard from "../components/SearchCard";
import { useLocation } from "react-router-dom";
import background from "../assets/CookifyBackground.png";

const RecipeSearch = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialIngredients = searchParams.get("ingredients") || "";

  const [ingredients, setIngredients] = useState(initialIngredients);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

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
      const response = await fetch(
        `http://localhost:5001/api/recipes/search?ingredients=${searchQuery}`
      );
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
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Arka plan desen katmanı */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${background})`,
          backgroundRepeat: "repeat",
          backgroundSize: "contain",
          opacity: 0.2, // burası ayarlanabilir (0.1 - 0.4 arası genelde ideal)
          zIndex: 0,
        }}
      />

      {/* İçerik katmanı */}
      <Box sx={{ position: "relative", zIndex: 1, padding: 3 }}>
        <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2 }}>
          Tarif Ara
        </Typography>

        <Paper
          elevation={3}
          sx={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: 3,
            borderRadius: 4,
            backgroundColor: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(4px)",
          }}
        >
          <TextField
            variant="outlined"
            label="Malzemeleri virgülle ayırarak girin"
            fullWidth
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": { borderRadius: 4 },
            }}
          />

          <Button
            variant="contained"
            onClick={() => fetchRecipes()}
            sx={{
              display: "block",
              width: "100%",
              backgroundColor: "#f97316",
              "&:hover": { backgroundColor: "#c05614" },
            }}
          >
            Ara
          </Button>
        </Paper>

        {error && (
          <Typography sx={{ color: "red", textAlign: "center", marginTop: 2 }}>
            {error}
          </Typography>
        )}

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
    </Box>
  );
};

export default RecipeSearch;