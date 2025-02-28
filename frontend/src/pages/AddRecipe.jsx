import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddRecipeCard from '../components/AddRecipeCard';
import { Button, Typography, Box, Container } from '@mui/material';

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('Ana Yemek');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
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
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      navigate('/recipes'); // Tarif eklendikten sonra kullanıcıyı feed sayfasına yönlendir
    } catch (error) {
      console.error("Tarif eklerken hata oluştu:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {!isAuthenticated ? (
        // Kullanıcı giriş yapmamışsa giriş yapmasını isteyen uyarı gösteriyoruz
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="error" gutterBottom>
            Tarif eklemek için giriş yapmalısınız.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate("/login")}
          >
            Giriş Yap
          </Button>
        </Box>
      ) : (
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
      )}
    </Container>
  );
};

export default AddRecipe;