import React from "react";
import { useParams } from "react-router-dom";
import italyRecipes from "../data/italyRecipes";
import "./CountryRecipes.css";
import CountryDishCard from "./CountryDishCard";

const recipeMap = {
  "İtalya": italyRecipes,
  // "Türkiye": turkeyRecipes,
  // "Fransa": franceRecipes,
};

const CountryRecipes = () => {
  const { country } = useParams();
  const recipes = recipeMap[country] || [];
  console.log("Ülke:", country);
console.log("Tarifler:", recipes);


  return (
    <div className="country-recipes-page">
      <h2 className="country-title">{country} Mutfağı</h2>
      <div className="country-recipes-grid">
        {recipes.length > 0 ? (
          recipes.map((dish, i) => <CountryDishCard key={i} dish={dish} />)
        ) : (
          <p>Bu ülkeye ait tarif bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default CountryRecipes;
