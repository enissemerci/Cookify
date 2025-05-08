import React from "react";
import { Container, Typography, Paper, Divider } from "@mui/material";
import "./AboutUs.css";
import background from "../assets/CookifyBG.png";

const AboutUs = () => {
  return (
    <div className="about-wrapper">
      {/* Arka plan katmanı */}
      <div
        className="about-background"
        style={{
          backgroundImage: `url(${background})`,
        }}
      />

      {/* İçerik katmanı */}
      <div className="about-container">
        <Container maxWidth="md">
          <Paper elevation={3} className="about-paper" sx={{ p: 4 }}>
            <Typography variant="h4" className="about-title">
              Hakkımızda
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Typography variant="body1" paragraph className="about-text">
              Cookify olarak mutfakta ilham vermek, lezzetleri paylaşmak ve yemek yapmayı herkes için daha keyifli hale getirmek için buradayız!
              İster deneyimli bir şef, ister mutfağa yeni adım atan biri olun, Cookify sizin mutfaktaki en yakın yol arkadaşınız.
            </Typography>

            <Typography variant="h6" gutterBottom className="about-section-title">
              Peki biz kimiz?
            </Typography>
            <Typography variant="body1" paragraph className="about-text">
              Cookify, yemek tariflerini sadece listelemekten öte, paylaşmayı, öğrenmeyi ve keşfetmeyi kolaylaştıran bir tarif paylaşım platformudur.
              Kullanıcılarımız dolaptaki malzemelerine uygun tarifler bulabilir, kendi tariflerini paylaşabilir ve toplulukla etkileşime geçebilir.
            </Typography>

            <Typography variant="h6" gutterBottom className="about-section-title">
              Neler sunuyoruz?
            </Typography>
            <ul className="about-list">
              <li>Malzemeye göre tarif arama</li>
              <li>Kullanıcı tarifleri ve yorumları</li>
              <li>Favorilere ekleme ve kaydetme</li>
              <li>Kişiselleştirilmiş öneriler</li>
              <li>Fotoğraf ve video ekleyerek tarif paylaşma</li>
              <li>“Haftanın Şefi” gibi ödüllü yarışmalar</li>
              <li>Rastgele yemek önerileri (Yemek Çarkı)</li>
              <li>Vegan, glütensiz, fit vb. tercihlere göre filtreleme</li>
            </ul>

            <Typography variant="h6" gutterBottom className="about-section-title">
              Neden Cookify?
            </Typography>
            <Typography variant="body1" className="about-text">
              Çünkü yemek, sadece beslenmek değil; bir paylaşım, kültür ve bağ kurma aracıdır. Cookify, dünya mutfağından yüzlerce tarifi bir araya getirerek,
              kullanıcıların kendi mutfak maceralarını yaratmasına ilham verir.
            </Typography>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default AboutUs;