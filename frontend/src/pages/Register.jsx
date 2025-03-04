import { useState } from 'react';
import { Button, TextField, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // useNavigate'yi dahil et
import API from '../api';
import "./Register.css"

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // useNavigate hook'u

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/register', formData);
      setMessage(res.data.message);
      // Kayıt başarılıysa login sayfasına yönlendir
      navigate('/login');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Kayıt başarısız');
    }
  };

  return (
    <Box className="register-container">
      <Container component="main" maxWidth="xs" className="register-box">
        <Typography variant="h5" component="h1" color="primary" sx={{ marginBottom: 2 }}>
          Cookify - Kayıt Ol
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Kullanıcı Adı"
            name="username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            required
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '14px',
              },
            }}
          />
          <TextField
            label="E-Posta"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '14px',
              },
            }}
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
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '14px',
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="submit-btn"
          >
            Kayıt Ol
          </Button>
        </form>
        {message && (
          <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        )}
        <Button
          onClick={() => navigate('/login')}
          fullWidth
          variant="text"
          className="login-btn"
        >
          Zaten hesabınız var mı? Giriş Yapın
        </Button>
      </Container>
    </Box>
  );
};

export default Register;