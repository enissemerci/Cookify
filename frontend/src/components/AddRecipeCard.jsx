import CATEGORIES from "../constants/categories";

import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Card,
  CardContent,
} from '@mui/material';
import './AddRecipeCard.css';

const AddRecipeCard = ({
  title,
  description,
  ingredients,
  steps,
  image,
  category,
  setTitle,
  setDescription,
  setIngredients,
  setSteps,
  setImage,
  setCategory,
  handleSubmit,
}) => {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const res = await fetch('http://localhost:5001/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data?.imageUrl) {
        setImage(data.imageUrl);
      } else {
        alert("Resim yüklenemedi.");
      }
    } catch (err) {
      console.error('Resim yüklenemedi:', err);
      alert("Resim yüklenemedi.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="card-container">
      <Card sx={{ maxWidth: 600, width: '100%' }}>
        <CardContent>
          <h2 className="text-2xl font-bold mb-6 text-center">Yeni Tarif Ekle</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Başlık"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Açıklama"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <TextField
              label="Malzemeler (virgülle ayırın)"
              variant="outlined"
              fullWidth
              value={ingredients.join(',')}
              onChange={(e) => setIngredients(e.target.value.split(','))}
              required
            />
            <TextField
              label="Yapılış Adımları (virgülle ayırın)"
              variant="outlined"
              fullWidth
              value={steps.join(',')}
              onChange={(e) => setSteps(e.target.value.split(','))}
              required
            />

            <label htmlFor="image-upload">
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    handleImageUpload(file);
                  }
                }}
              />
              <Button
                variant="outlined"
                component="span"
                disabled={uploading}
              >
                {uploading ? 'Yükleniyor...' : 'Resmi Yükle'}
              </Button>
            </label>

            {image && (
              <TextField
                label="Yüklenen Resim URL"
                variant="outlined"
                fullWidth
                value={image}
                InputProps={{ readOnly: true }}
                sx={{ mt: 1 }}
              />
            )}

            <FormControl fullWidth>
              <InputLabel>Kategori</InputLabel>
              <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Kategori"
                  required
              >
                  {CATEGORIES.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
              ))}
              </Select>
              <FormHelperText>Bir kategori seçin</FormHelperText>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Tarif Paylaş
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddRecipeCard;
