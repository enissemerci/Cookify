import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TestResultPage.css";

// Statik sonuçlar
const results = {
  "Pina Colada": {
    title: "Sen tam bir Pina Colada ruhusun!",
    description: "Tatlı, enerjik ve baş döndürücü! Hayat dolu kişiliğinle ortamlarda parlıyorsun.",
    image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748031828/non-alcoholic-pina-colada-6_eco22z.jpg"
  },
  Mojito: {
    title: "Sen tam bir Mojito ruhusun!",
    description: "Canlı, taze ve enerjik bir yapın var. İnsanlara ilham veriyorsun!",
    image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748031107/SAVEUR_Mojito_1149-Edit-scaled_lddxtd.webp"
  },
  Martini: {
    title: "Sen bir Martini ruhusun!",
    description: "Zarif, sofistike ve özgüvenli... Seninle olmak her zaman ayrıcalık.",
    image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748072458/vodka-martini-recipe_wnkcyi.webp"
  },
  Negroni: {
    title: "Sen bir Negroni ruhusun!",
    description: "Derin, güçlü ve karizmatiksin. Az konuşur, çok etkilersin.",
    image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748031826/Negroni-Recipe-004-copy_z0ufau.webp"
  }
};

const TestResultPage = () => {
  const { result } = useParams();
  const navigate = useNavigate();

  const data = results[result] || {
    title: "Sonuç Bulunamadı",
    description: "Bir şeyler yanlış gitti.",
    image: ""
  };

  return (
    <div className="result-container">
      <h2 className="result-title">{data.title}</h2>
      <img src={data.image} alt={result} className="result-image" />
      <p className="result-description">{data.description}</p>
      <button className="retry-btn" onClick={() => navigate("/")}>Ana Sayfaya Dön</button>
    </div>
  );
};

export default TestResultPage;
