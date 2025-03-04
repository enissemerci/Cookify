import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import SearchCard from '../components/SearchCard';

const RecipeSearch = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!ingredients) {
      alert("Lütfen malzemeleri girin.");
      return;
    }

    const ingredientsLowerCase = ingredients.toLowerCase();

    try {
      const response = await fetch(`http://localhost:5001/api/recipes/search?ingredients=${ingredientsLowerCase}`);
      if (!response.ok) {
        throw new Error('API hatası');
      }

      const data = await response.json();
      setRecipes(data);
      setError(null);
    } catch (error) {
      console.error("Tarifler alınamadı:", error);
      setError("Tarifler alınırken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f4f4f9' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>
        Tarif Ara
      </Typography>
      
      {/* Malzeme Arama Alanı */}
      <TextField
        variant="outlined"
        label="Malzemeleri virgülle ayırarak girin"
        fullWidth
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        sx={{
          marginBottom: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
          }
        }}
      />
      
      {/* Ara Butonu */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{
          display: 'block',
          width: '100%',
          backgroundColor: '#f97316',
          '&:hover': { backgroundColor: '#c05614' },
        }}
      >
        Ara
      </Button>

      {/* Hata Mesajı */}
      {error && <Typography sx={{ color: 'red', textAlign: 'center', marginTop: 2 }}>{error}</Typography>}

      {/* Tariflerin Listelendiği Kısım */}
      <Box sx={{ marginTop: 4 }}>
        {recipes.length === 0 && !error ? (
          <Typography variant="h6" color="textSecondary" align="center">
            Malzemelere uygun tarif bulunamadı.
          </Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {recipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe._id}>
                <SearchCard recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default RecipeSearch;