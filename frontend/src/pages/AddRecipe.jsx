import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddRecipeCard from '../components/AddRecipeCard'; // Yeni bileşeni import ediyoruz.

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('Ana Yemek');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const token = localStorage.getItem('token'); // Token'ı localStorage'dan alıyoruz
  if (!token) {
    console.log('Token bulunamadı!');
    return;
  }

  const recipeData = {
    title,
    description,
    ingredients,
    steps,
    image,
    category,
  };

  try {
    const response = await axios.post(
      'http://localhost:5001/api/recipes/add',
      recipeData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Token'ı Authorization başlığına ekliyoruz
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Tarif eklerken hata oluştu:", error);
  }
};

  return (
    <div className="bg-gray-100">
      <AddRecipeCard
        title={title}
        description={description}
        ingredients={ingredients}
        steps={steps}
        image={image}
        category={category}
        setTitle={setTitle}
        setDescription={setDescription}
        setIngredients={setIngredients}
        setSteps={setSteps}
        setImage={setImage}
        setCategory={setCategory}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddRecipe;