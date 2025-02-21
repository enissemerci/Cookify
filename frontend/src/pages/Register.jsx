import { useState } from 'react';
import API from '../api';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/register', formData);
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Kayıt başarısız');
    }
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Kullanıcı Adı" onChange={handleChange} required />
        <input type="email" name="email" placeholder="E-Posta" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Şifre" onChange={handleChange} required />
        <button type="submit">Kayıt Ol</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;