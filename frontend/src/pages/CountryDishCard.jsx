import React, { useState } from "react";
import "./CountryDishCard.css";

const CountryDishCard = ({ dish }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`country-dish-card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
      <div className="card-inner">
        <div className="card-front">
          <img src={dish.image} alt={dish.title} />
          <h3>{dish.title}</h3>
        </div>
        <div className="card-back">
          <h4>Malzemeler</h4>
          <ul>{dish.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}</ul>

          <h4>Yapılış</h4>
          <p>{dish.instructions}</p>

          <h4>Püf Noktası</h4>
          <p>{dish.tips}</p>

          <h4>Pişirme Süresi</h4>
          <p>{dish.cookingTime}</p>

          <h4>Kalori</h4>
          <p>{dish.calories}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryDishCard;
