import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import Slider from "react-slick";
import "./TraditionalSlider.css";

const TraditionalSlider = () => {
  const navigate = useNavigate();

  // Sabit veriler
  const dishes = [
    { id: 1, title: "Baklava", imageUrl: "/yemekler/1.png" },
    { id: 2, title: "Lahmacun", imageUrl: "/yemekler/2.png" },
    { id: 3, title: "Menemen", imageUrl: "/yemekler/3.png" },
    { id: 4, title: "Sarma", imageUrl: "/yemekler/4.png" },
    { id: 5, title: "Etli Kuru Fasulye", imageUrl: "/yemekler/5.png" },
    { id: 6, title: "Çiğ Köfte", imageUrl: "/yemekler/6.png" },
    { id: 7, title: "Pide", imageUrl: "/yemekler/7.png" },
    { id: 8, title: "İskender", imageUrl: "/yemekler/8.png" },
    { id: 9, title: "Tava Ciğer", imageUrl: "/yemekler/9.png" },
    { id: 10, title: "Mantı", imageUrl: "/yemekler/10.png" },
  ];

  const handleDishClick = (dishId) => {
    navigate(`/dish/${dishId}`);
  };

  // Slider ayarları
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <div className="slick-prev"></div>,  // Geri butonu
    nextArrow: <div className="slick-next"></div>,  // İleri butonu
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="traditional-slider-container">
      <Typography variant="h5" className="slider-title">
        Geleneksel Yemekler
      </Typography>

      {/* react-slick Carousel */}
      <Slider {...sliderSettings}>
        {dishes.map((dish) => (
          <Paper
            key={dish.id}
            className="slider-item"
            onClick={() => handleDishClick(dish.id)}
          >
            <img src={dish.imageUrl} alt={dish.title} className="dish-image" />
            <Typography className="dish-title">{dish.title}</Typography>
          </Paper>
        ))}
      </Slider>
    </div>
  );
};

export default TraditionalSlider;