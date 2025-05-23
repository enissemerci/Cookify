import React from "react";
import { Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DishCard = ({ dish, type = "dish" }) => {
  const navigate = useNavigate();

  return (
    <Paper
      className="slider-item"
      onClick={() => navigate(`/${type}/${dish.id}`)} // 👈 farklı rota
      sx={{ p: 2, textAlign: "center", cursor: "pointer" }}
    >
      <img src={dish.imageUrl} alt={dish.title} className="dish-image" style={{ width: "100%" }} />
      <Typography variant="h6">{dish.title}</Typography>
    </Paper>
  );
};


export default DishCard;