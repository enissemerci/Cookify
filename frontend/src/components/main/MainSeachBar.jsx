import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Stack, Paper, Typography, InputAdornment } from "@mui/material";
import "./MainSearchBar.css";

const MainSearchBar = () => {
  const [ingredients, setIngredients] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
    }
  }, []);

  const handleSearch = () => {
    if (!isAuthenticated) {
      alert("Arama yapmak için giriş yapmalısınız.");
      navigate("/login");
      return;
    }

    if (!ingredients.trim()) {
      alert("Lütfen malzemeleri girin.");
      return;
    }

    navigate(`/search?ingredients=${encodeURIComponent(ingredients)}`);
  };

  return (
    <div className="main-search-container">
      <Typography variant="h4" fontWeight="bold" color="" className="search-title">
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
                    disabled={!isAuthenticated}
                  >
                    Ara
                  </Button>
                </InputAdornment>
              ),
            }}
            disabled={!isAuthenticated}
          />
          {!isAuthenticated && (
            <Typography variant="body2" color="error">
              Arama yapmak için giriş yapmalısınız.
            </Typography>
          )}
        </Stack>
      </Paper>
    </div>
  );
};

export default MainSearchBar;