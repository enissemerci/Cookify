import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import "./MyLikes.css";

const MyLikes = () => {
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [flippedCards, setFlippedCards] = useState({}); // Kartın döndüğünü takip eden state
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/users/favorites",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLikedRecipes(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Beğenilen tarifler alınırken hata oluştu:", error);
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [token]);

  const handleUnfavorite = async (recipeId) => {
    try {
      await axios.post(
        `http://localhost:5001/api/recipes/${recipeId}/favorite`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLikedRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeId)
      );
    } catch (error) {
      console.error("Beğenilen tariften çıkarma işlemi başarısız:", error);
    }
  };

  const toggleFlip = (recipeId) => {
    setFlippedCards((prev) => ({
      ...prev,
      [recipeId]: !prev[recipeId],
    }));
  };

  return (
    <Container>
      <Typography variant="h4" className="page-title">
        Beğendiğin Tarifler ❤️
      </Typography>
      {isLoading ? (
        <Typography variant="body1">Yükleniyor...</Typography>
      ) : (
        <Grid container spacing={3} className="cards">
          {likedRecipes.length > 0 ? (
            likedRecipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe._id}>
                <div
                  className={`flip-card ${
                    flippedCards[recipe._id] ? "flipped" : ""
                  }`}
                >
                  {/* Ön Yüz */}
                  <Card className="flip-card-front">
                    <CardMedia
                      component="img"
                      height="200"
                      image={recipe.image}
                      alt={recipe.title}
                    />
                    <CardContent>
                      <Typography variant="h6">{recipe.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {recipe.description.length > 100
                          ? recipe.description.substring(0, 100) + "..."
                          : recipe.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="error"
                        startIcon={recipe.isLiked ? <Favorite /> : <Favorite />}
                        onClick={() => handleUnfavorite(recipe._id)}
                      >
                        {recipe.isLiked ? "Beğenildi" : "Beğenilerden Çıkar"}
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => toggleFlip(recipe._id)}
                      >
                        Tarifi Gör
                      </Button>
                    </CardActions>
                  </Card>

                  {/* Arka Yüz */}
                  <Card className="flip-card-back">
                    <CardContent>
                      <Typography variant="h6">Malzemeler:</Typography>
                      <ul>
                        {recipe.ingredients.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>

                      <Typography variant="h6">Yapılış Adımları:</Typography>
                      <ol>
                        {recipe.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => toggleFlip(recipe._id)}
                      >
                        Geri Dön
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" className="no-likes">
              Henüz hiç tarif beğenmedin! 🥺
            </Typography>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default MyLikes;
