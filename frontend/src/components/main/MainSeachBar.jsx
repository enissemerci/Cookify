import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Stack, Paper, Typography, InputAdornment } from "@mui/material";
import "./MainSearchBar.css";

const MainSearchBar = () => {
  const [ingredients, setIngredients] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!ingredients.trim()) {
      alert("Lütfen malzemeleri girin.");
      return;
    }

    navigate(`/search?ingredients=${encodeURIComponent(ingredients)}`);
  };

  return (
    <div className="main-search-container">
      <Typography variant="h4" fontWeight="bold" color="white" className="search-title">
        Ne pişirmek istersin?
      </Typography>
      <Paper elevation={3} sx={{ borderRadius: 3 }} className="search-paper">
        <Stack spacing={2} alignItems="center">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Malzemeleri girin..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="search-input"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    className="search-button"
                    onClick={handleSearch}
                  >
                    Ara
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Paper>
    </div>
  );
};

export default MainSearchBar;