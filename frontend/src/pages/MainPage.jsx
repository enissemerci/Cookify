import React from 'react'
import { Typography, Container } from '@mui/material' // Material UI komponentlerini import ettik
import MainSearchBar from '../components/main/MainSeachBar'
import TraditionalSlider from '../components/main/TraditionalSlider'

export const MainPage = () => {
  return (
    <div>
      {/* Ana Sayfa Başlığı ve Açıklama */}
      <Container sx={{ textAlign: 'center', padding: '40px 20px' }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, marginBottom: '20px' }}>
          Cookify'e Hoşgeldiniz!
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '18px', color: '#555' }}>
          Lezzetli ve pratik yemek tarifleri keşfedin. Şimdi, dolabınızdaki malzemelerle harika yemekler yapmanın zamanı!
        </Typography>
      </Container>

      {/* Arama Çubuğu ve Slider */}
      <MainSearchBar />
      <TraditionalSlider />
    </div>
  )
}