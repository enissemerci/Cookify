import React from "react";
import { useParams } from "react-router-dom";
import italyRecipes from "../data/italyRecipes";
import japanRecipes from "../data/japanRecipes";
import "./CountryRecipes.css";
import CountryDishCard from "./CountryDishCard";
import mexicoRecipes from "../data/mexicoRecipes";
import indiaRecipes from "../data/indiaRecipes";
import franceRecipes from "../data/franceRecipes";
import turkeyRecipes from "../data/turkeyRecipes";
import thailandRecipes from "../data/thailandRecipes";
import chinaRecipes from "../data/chinaRecipes";
import greeceRecipes from "../data/greeceRecipes";
import lebanonRecipes from "../data/lebanonRecipes";
import spainRecipes from "../data/spainRecipes";
import brazilRecipes from "../data/brazilRecipes";










const recipeMap = {
  "İtalya": italyRecipes,
  "Japonya": japanRecipes,
  "Meksika": mexicoRecipes,
  "Hindistan": indiaRecipes,
  "Fransa": franceRecipes,
  "Türkiye": turkeyRecipes,
  "Tayland": thailandRecipes,
  "Çin": chinaRecipes,
  "Yunanistan": greeceRecipes,
  "Lübnan": lebanonRecipes,
  "İspanya": spainRecipes,
  "Brezilya": brazilRecipes,










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
