import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, Container } from "@mui/material";
import API from "../api";
import "./Login.css"; // CSS dosyasını import ediyoruz

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", formData);
  
      // Token ve kullanıcı bilgilerini localStorage'e kaydediyoruz
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId); // Kullanıcı ID'si kaydediliyor
      localStorage.setItem("username", res.data.username); // Kullanıcı adı kaydediliyor
  
      setMessage("Giriş başarılı");
      navigate("/recipes"); // Kullanıcıyı yönlendir
    } catch (error) {
      setMessage(error.response?.data?.message || "Giriş başarısız");
    }
  };

  const handleNavigateToRegister = () => {
    navigate("/register"); // Kayıt sayfasına yönlendir
  };

  return (
    <Box className="login-container">
      <Container component="main" maxWidth="xs" className="login-box">
        <Box className="form-container">
          <Typography
            variant="h5"
            component="h1"
            color="primary"
            sx={{ marginBottom: 2 }}
          >
            Cookify - Giriş Yap
          </Typography>
          <form onSubmit={handleSubmit} className="form">
            <TextField
              label="E-Posta"
              name="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
            <TextField
              label="Şifre"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#f97316",
                "&:hover": { backgroundColor: "#f97316" },
              }}
              className="submit-btn"
            >
              Giriş Yap
            </Button>
          </form>
          {message && (
            <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
              {message}
            </Typography>
          )}

          {/* Kayıt Ol Butonu */}
          <Button
            onClick={handleNavigateToRegister}
            fullWidth
            variant="outlined"
            sx={{
              marginTop: 2,
              color: "#f97316",
              borderColor: "#f97316",
              "&:hover": { borderColor: "#f97316", color: "#fff" },
            }}
          >
            Hesabınız yok mu? Kayıt Ol
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;