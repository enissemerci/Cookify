import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="E-Posta" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Şifre" onChange={handleChange} required />
        <button type="submit">Giriş Yap</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;