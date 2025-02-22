import { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box, Paper } from '@mui/material';
import API from '../api';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Token'i kontrol et
    const token = localStorage.getItem('token');
    //console.log('Stored Token:', token); // Token'i konsola yazdır istiyorsan eğer sadece denedim token doğru mu diye

    const fetchUsers = async () => {
      try {
        if (!token) {
          console.error('Token bulunamadı! Yetkisiz erişim.');
          return;
        }

        const res = await API.get('/users', {
          headers: { Authorization: `Bearer ${token}` }, // Token'i istekle gönder
        });

        setUsers(res.data);
      } catch (error) {
        console.error('Kullanıcıları getirirken hata oluştu:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          backgroundColor: '#fff3e0', // Turuncu tonları
          padding: '20px',
          borderRadius: '8px',
          boxShadow: 3,
          marginTop: 4,
        }}
      >
        <Typography variant="h5" component="h1" color="primary" sx={{ marginBottom: 2, textAlign: 'center' }}>
          Kullanıcı Listesi
        </Typography>
        {users.length > 0 ? (
          <Paper elevation={3} sx={{ padding: 2 }}>
            <List>
              {users.map((user) => (
                <ListItem key={user.id} divider>
                  <ListItemText primary={user.username} secondary={user.email} />
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          <Typography variant="body1" color="textSecondary" align="center">
            Henüz kayıtlı kullanıcı yok.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;