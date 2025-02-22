import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    try {
      const res = await axios.post('http://localhost:5001/api/recipes/add', {
        title,
        description,
        ingredients,
        steps,
        image,
        category,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.status === 201) {
        navigate('/'); // Başarılıysa ana sayfaya yönlendir
      }
    } catch (error) {
      console.error('Tarif eklerken hata oluştu:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Yeni Tarif Ekle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Başlık" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
        <textarea placeholder="Açıklama" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Malzemeler (virgülle ayırın)" onChange={(e) => setIngredients(e.target.value.split(','))} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Yapılış Adımları (virgülle ayırın)" onChange={(e) => setSteps(e.target.value.split(','))} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Resim URL" value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-2 border rounded" />
        
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded">
          <option value="Tatlı">Tatlı</option>
          <option value="Ana Yemek">Ana Yemek</option>
          <option value="Atıştırmalık">Atıştırmalık</option>
          <option value="İçecek">İçecek</option>
          <option value="Diğer">Diğer</option>
        </select>

        <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
          Tarif Paylaş
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;