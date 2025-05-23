import React from "react";
import cocktails from "../data/cocktails";
import CocktailCard from "../components/CocktailCard";
import "./CocktailPage.css";

const CocktailPage = () => {
  return (
    <div className="cocktail-page">
      <h2 className="cocktail-title">Barların Yıldızları</h2>
      <div className="cocktail-grid">
        {cocktails.map((cocktail) => (
          <CocktailCard key={cocktail.id} cocktail={cocktail} />
        ))}
      </div>
    </div>
  );
};

export default CocktailPage;
