import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Feed = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Stored Token:', token); // Token'i konsola yazdır istiyorsan eğer sadece denedim token doğru mu diye
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem('token'); // Token'ı buradan alıyoruz
        if (!token) {
          console.error("Token bulunamadı!");
          return;
        }
        const res = await axios.get('http://localhost:5001/api/recipes/recipes', {
          headers: {
            Authorization: `Bearer ${token}` // Token'ı başlığa ekliyoruz
          }
        });
        console.log('Tarifler:', res.data); // Veriyi konsolda kontrol edelim
        setRecipes(res.data); // Veriyi state'e kaydedelim
      } catch (error) {
        console.error('Tarifler getirilirken bir hata oluştu', error.response || error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <button
        onClick={() => navigate("/add-recipe")}
        className="w-full bg-orange-500 text-white py-2 rounded-lg mb-6 hover:bg-orange-600"
      >
        + Gönderi Paylaş
      </button>

      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white shadow-md rounded-lg p-4 mb-6"
          >
            <div className="flex items-center mb-3">
              <img
                src={recipe.author.profileImage || "/default-avatar.png"}
                alt={recipe.author.username}
                className="w-10 h-10 rounded-full"
              />
              <span className="ml-3 font-semibold">{recipe.author.username}</span>
            </div>

            <img
              src={recipe.image || "/placeholder.png"}
              alt={recipe.title}
              className="w-full rounded-lg mb-3"
            />

            <h3 className="font-bold text-lg">{recipe.title}</h3>
            <p className="text-gray-600">{recipe.description}</p>

            <div className="flex justify-between mt-3 text-sm text-gray-500">
              <span>{recipe.likes.length} Beğeni</span>
              <span>{recipe.comments.length} Yorum</span>
            </div>
          </div>
        ))
      ) : (
        <p>Henüz tarif bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default Feed;