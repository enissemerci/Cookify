import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Container } from '@mui/material';
import API from '../api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/login', formData);
      localStorage.setItem('token', res.data.token);
      setMessage('Giriş başarılı');
      navigate('/dashboard'); // Kullanıcıyı yönlendir
    } catch (error) {
      setMessage(error.response?.data?.message || 'Giriş başarısız');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff3e0', // Turuncu tonları
          borderRadius: '8px',
          padding: '20px',
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" component="h1" color="primary" sx={{ marginBottom: 2 }}>
          Cookify - Giriş Yap
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
            color="primary"
            sx={{
              marginTop: 2,
              padding: '10px',
              backgroundColor: '#ff7043', // Turuncu renk tonu
              '&:hover': {
                backgroundColor: '#ff5722', // Hover için koyu turuncu
              },
            }}
          >
            Giriş Yap
          </Button>
        </form>
        {message && (
          <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Login;