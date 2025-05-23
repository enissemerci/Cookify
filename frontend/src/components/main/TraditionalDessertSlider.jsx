import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Slider from "react-slick";
import axios from "axios";
import "./TraditionalSlider.css";
import DishCard from "./DishCard";

const TraditionalDessertSlider = () => {
  const [desserts, setDesserts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/sliderDesserts")
      .then(res => setDesserts(res.data))
      .catch(err => console.error("Tatlı verileri alınamadı!", err));
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
      <Typography variant="h5" className="slider-title">Geleneksel Tatlılar</Typography>
      <Slider {...sliderSettings}>
        {desserts.map((dish) => (
          <DishCard key={dish.id} dish={dish} type="dessert" />

        ))}
      </Slider>
    </div>
  );
};

export default TraditionalDessertSlider;
