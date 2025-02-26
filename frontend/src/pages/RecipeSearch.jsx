import React, { useState } from 'react';

const RecipeSearch = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null); // Hata mesajı için state

  const handleSearch = async () => {
    if (!ingredients) {
      alert("Lütfen malzemeleri girin.");
      return;
    }

    // Kullanıcıdan gelen girdi küçük harfe çevrilsin
    const ingredientsLowerCase = ingredients.toLowerCase();

    try {
      const response = await fetch(`http://localhost:5001/api/recipes/search?ingredients=${ingredientsLowerCase}`);
      if (!response.ok) {
        throw new Error('API hatası');
      }

      const data = await response.json();
      setRecipes(data); // Gelen tarifleri state'e kaydet
      setError(null); // Hata mesajını temizle
    } catch (error) {
      console.error("Tarifler alınamadı:", error);
      setError("Tarifler alınırken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div>
      <h2>Tarif Ara</h2>
      <input
        type="text"
        placeholder="Malzemeleri virgülle ayırarak girin"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button onClick={handleSearch}>Ara</button>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hata mesajı */}
      
      <div>
        <h3>Bulunan Tarifler:</h3>
        {recipes.length === 0 && !error ? (
          <p>Malzemelere uygun tarif bulunamadı.</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe._id}>
              <h4>{recipe.title}</h4>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipeSearch;