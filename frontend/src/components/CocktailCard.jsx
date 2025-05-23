import React, { useState } from "react";
import "./CocktailCard.css"; 

const CocktailCard = ({ cocktail }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`cocktail-card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
      <div className="card-inner">
        <div className="card-front">
          <img src={cocktail.image} alt={cocktail.title} />
          <h3>{cocktail.title}</h3>
        </div>
        <div className="card-back">
          <h4>Malzemeler</h4>
          <ul>{cocktail.ingredients.map((item, i) => <li key={i}>{item}</li>)}</ul>

          <h4>Hazırlanışı</h4>
          <p>{cocktail.instructions}</p>

          <h4>İpucu</h4>
          <p>{cocktail.tips}</p>
        </div>
      </div>
    </div>
  );
};

export default CocktailCard;
