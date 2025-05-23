import React from "react";
import { useNavigate } from "react-router-dom";
import "./WorldCuisine.css";

const countries = [
  { name: "İtalya", image: "src/images/italy.jpg" },
  { name: "Japonya", image: "src/images/japan.jpg" },
  { name: "Meksika", image: "src/images/mexico.jpg" },
  { name: "Hindistan", image: "src/images/india.jpg" },
  { name: "Fransa", image: "src/images/france.jpg" },
  { name: "Türkiye", image: "src/images/turkey.jpg" },
  { name: "Tayland", image: "src/images/thailand.jpg" },
  { name: "Çin", image: "src/images/china.jpg" },
  { name: "Yunanistan", image: "src/images/greece.jpg" },
  { name: "Lübnan", image: "src/images/lebanon.jpg" },
  { name: "İspanya", image: "src/images/spain.jpg" },
  { name: "Brezilya", image: "src/images/brazil.jpg" },
];

const WorldCuisine = () => {
  const navigate = useNavigate();

  return (
    <div className="world-cuisine-page">
      <h2>Mutfaklar</h2>
      <div className="country-grid">
        {countries.map((country) => (
          <div
            key={country.name}
            className="country-card"
            onClick={() => navigate(`/world-cuisine/${country.name}`)}
          >
            <img src={country.image} alt={country.name} />
            <h3>{country.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldCuisine;
