import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText, Card, CardContent } from '@mui/material';
import "./AddRecipeCard.css";

const AddRecipeCard = ({ title, description, ingredients, steps, image, category, setTitle, setDescription, setIngredients, setSteps, setImage, setCategory, handleSubmit }) => {
  return (
    <div className="card-container"> {/* Bu div card'ı sarmalayan kapsayıcı */}
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
            <TextField
              label="Resim URL"
              variant="outlined"
              fullWidth
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            
            <FormControl fullWidth>
              <InputLabel>Kategori</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Kategori"
                required
              >
                <MenuItem value="Tatlı">Tatlı</MenuItem>
                <MenuItem value="Ana Yemek">Ana Yemek</MenuItem>
                <MenuItem value="Atıştırmalık">Atıştırmalık</MenuItem>
                <MenuItem value="İçecek">İçecek</MenuItem>
                <MenuItem value="Diğer">Diğer</MenuItem>
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