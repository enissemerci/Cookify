import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Paper } from "@mui/material";
import { LocalDining, AccessTime, LocalFireDepartment, Restaurant, PanTool, Kitchen, ThumbUp, Lightbulb } from "@mui/icons-material";
import axios from "axios";
import "./DishDetailPage.css";

const DishDetailPage = () => {
  const { id } = useParams();
  const [dish, setDish] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/sliderDishes/${id}`)
      .then((response) => setDish(response.data))
      .catch((error) => console.error("Yemek verisi alınamadı!", error));
    
    window.scrollTo(0, 0);
  }, [id]);

  if (!dish) {
    return <Typography>Yemek bulunamadı!</Typography>;
  }

  return (
    <Container maxWidth="lg" className="dish-detail-container">
      <Paper elevation={3} className="dish-header">
        <Typography variant="h4" className="dish-title-page">{dish.title}</Typography>
        <img src={dish.imageUrl} alt={dish.title} className="dish-image-detail" />
        <Typography className="dish-description">{dish.description}</Typography>
      </Paper>

      <Paper className="info-card info-card-color">
        <Typography variant="h6"><LocalDining /> Yemek Bilgileri</Typography>
        <p><LocalFireDepartment /> {dish.calories}</p>
        <p><AccessTime /> Hazırlık: {dish.prepTime}</p>
        <p><Restaurant /> Pişirme: {dish.cookTime}</p>
        <p><LocalDining /> {dish.servings}</p>
      </Paper>

      <Paper className="info-card">
        <Typography variant="h6"><Kitchen /> Malzemeler</Typography>
        <ul>{dish.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}</ul>
      </Paper>

      <Paper className="info-card">
        <Typography variant="h6"><PanTool /> Nasıl Yapılır?</Typography>
        <ul>{dish.steps.map((step, i) => <li key={i}>{step}</li>)}</ul>
      </Paper>

      <Paper className="info-card info-card-blue">
        <Typography variant="h6"><ThumbUp /> Servis Önerisi</Typography>
        <ul>{dish.servingTips.map((tip, i) => <li key={i}>{tip}</li>)}</ul>
      </Paper>

      <Paper className="info-card info-card-color">
        <Typography variant="h6"><Lightbulb /> Püf Noktaları</Typography>
        <ul>{dish.tips.map((tip, i) => <li key={i}>{tip}</li>)}</ul>
      </Paper>
    </Container>
  );
};

export default DishDetailPage;