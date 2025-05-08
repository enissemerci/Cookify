import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import "./MyLikes.css";
import fallbackImage from "../assets/foto.webp";

const MyLikes = () => {
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false); // token yoksa giriş yapılmamış
      setIsLoading(false); // loading'i kapatalım
      return;
    }

    const fetchFavorites = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/users/favorites",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLikedRecipes(res.data);
      } catch (error) {
        console.error("Beğenilen tarifler alınırken hata oluştu:", error);
      } finally {
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
      {!isAuthenticated ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="error" gutterBottom>
            Beğendiğiniz tarifleri görmek için giriş yapmalısınız.
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
          <Typography variant="h4" className="page-title">
            Beğendiğin Tarifler
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
                          image={recipe.image || fallbackImage}
                          alt={recipe.title}
                        />
                        <CardContent>
                          <Typography variant="h6">
                            {recipe.title.length > 20
                              ? recipe.title.substring(0, 20) + " ..."
                              : recipe.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {recipe.description.length > 75
                              ? recipe.description.substring(0, 75) + "..."
                              : recipe.description}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            color="error"
                            startIcon={<Favorite />}
                            onClick={() => handleUnfavorite(recipe._id)}
                          >
                            Beğenilerden Çıkar
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
        </>
      )}
    </Container>
  );
};

export default MyLikes;