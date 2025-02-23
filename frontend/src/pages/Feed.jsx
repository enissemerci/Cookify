import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";  // RecipeCard bileşenini import ediyoruz
import './Feed.css';  // Ana sayfa için CSS dosyasını import ediyoruz

const Feed = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Stored Token:", token);

    const fetchRecipes = async () => {
      try {
        if (!token) {
          console.error("Token bulunamadı!");
          return;
        }
        const res = await axios.get("http://localhost:5001/api/recipes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Tarifler:", res.data);
        setRecipes(res.data);
      } catch (error) {
        console.error(
          "Tarifler getirilirken bir hata oluştu",
          error.response || error
        );
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="feed-container">
      {/* Tarif Ekle Butonu */}
      <button
        onClick={() => navigate("/add-recipe")}
        className="feed-btn"
      >
        + Gönderi Paylaş
      </button>

      {/* Tarifler */}
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))
      ) : (
        <p className="text-center text-gray-500">Henüz tarif bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default Feed;