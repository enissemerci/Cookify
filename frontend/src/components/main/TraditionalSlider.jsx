import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Slider from "react-slick";
import axios from "axios";
import "./TraditionalSlider.css";
import DishCard from "./DishCard";

const TraditionalSlider = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/sliderDishes")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetch API Yanıtı:", data);
        setDishes(data);
      })
      .catch((error) => console.error("Slider verileri çekilemedi!", error));
  }, []);

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <div className="slick-prev"></div>,
    nextArrow: <div className="slick-next"></div>,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="traditional-slider-container">
      <Typography variant="h5" className="slider-title">
        Geleneksel Yemekler
      </Typography>
      <Slider {...sliderSettings}>
        {Array.isArray(dishes) &&
          dishes.map((dish) => <DishCard key={dish.id} dish={dish} />)}
      </Slider>
    </div>
  );
};

export default TraditionalSlider;
