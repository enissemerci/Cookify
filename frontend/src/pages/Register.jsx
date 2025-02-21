import { useState } from 'react';
import { Button, TextField, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // useNavigate'yi dahil et
import API from '../api';

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
            Kayıt Ol
          </Button>
        </form>
        {message && (
          <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        )}
        {/* Giriş yapmaya yönlendiren buton */}
        <Button
          onClick={() => navigate('/login')}
          fullWidth
          variant="text"
          sx={{
            marginTop: 2,
            color: '#ff7043', // Turuncu renk
            '&:hover': {
              color: '#ff5722', // Hover için koyu turuncu
            },
          }}
        >
          Zaten hesabınız var mı? Giriş Yapın
        </Button>
      </Box>
    </Container>
  );
};

export default Register;