import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Paper } from "@mui/material";
import { LocalDining, AccessTime, LocalFireDepartment, Restaurant,PanTool, Kitchen, ThumbUp, Lightbulb } from "@mui/icons-material"; // Yeni ikonlar
import "./DishDetailPage.css"; // Yeni CSS dosyamız
//backend de tutulacaklar bunlar
const dishes = [
    {
      id: 1,
      title: "Baklava",
      imageUrl: "/yemekler/1.png",
      description: "Baklava, kat kat yufka arasına ceviz veya fıstık eklenerek yapılan geleneksel bir tatlıdır.",
      calories: "350 kcal",
      prepTime: "20 dakika",
      cookTime: "25 dakika",
      servings: "4 Kişilik",
      ingredients: ["500 gr baklavalık yufka", "250 gr tereyağı", "200 gr ceviz"],
      steps: [
        "Yufkaları tepsiye kat kat dizin.",
        "Her kat arasına eritilmiş tereyağı sürün.",
        "Üzerine ceviz ekleyin ve fırında pişirin."
      ],
      servingTips: ["Üzerine Antep fıstığı ekleyerek servis edebilirsiniz."],
      tips: ["Tereyağını iyice yedirmek için fırça kullanabilirsiniz."]
    },
    {
      id: 2,
      title: "Lahmacun",
      imageUrl: "/yemekler/2.png",
      description: "Lahmacun, ince bir hamurun üzerine kıymalı harç sürülüp, fırında pişirilen Türk mutfağına ait bir yemektir.",
      calories: "300 kcal",
      prepTime: "30 dakika",
      cookTime: "15 dakika",
      servings: "4 Kişilik",
      ingredients: ["300 gr dana kıyması", "1 adet soğan", "1 adet domates", "2 yemek kaşığı domates salçası", "1 tatlı kaşığı pul biber", "Hamur için un, su, tuz"],
      steps: [
        "Hamuru yoğurun ve küçük bezelere ayırın.",
        "Kıymayı soğan, domates ve baharatlarla karıştırın.",
        "Hamurun üzerine hazırladığınız harcı yayın.",
        "Fırında 15 dakika pişirin ve sıcak servis yapın."
      ],
      servingTips: ["Yanında limon ve marulla servis edebilirsiniz."],
      tips: ["Hamurun ince açılmasına dikkat edin, yoksa pişerken sertleşebilir."]
    },
    {
      id: 3,
      title: "Menemen",
      imageUrl: "/yemekler/3.png",
      description: "Menemen, domates, biber ve yumurta ile yapılan geleneksel bir Türk kahvaltısı yemeğidir.",
      calories: "250 kcal",
      prepTime: "10 dakika",
      cookTime: "10 dakika",
      servings: "2 Kişilik",
      ingredients: ["3 adet domates", "2 adet yeşil biber", "2 adet yumurta", "1 yemek kaşığı zeytinyağı", "Tuz, karabiber"],
      steps: [
        "Domatesleri soyup doğrayın, biberleri ince ince kesin.",
        "Zeytinyağında biberleri soteleyin.",
        "Domatesleri ekleyin ve pişirin.",
        "Yumurtaları kırıp karıştırarak pişirin."
      ],
      servingTips: ["Yanında taze ekmekle servis edebilirsiniz."],
      tips: ["Yumurtaların pişme süresine dikkat edin, çok pişmesin."]
    },
    {
      id: 4,
      title: "Sarma",
      imageUrl: "/yemekler/4.png",
      description: "Sarma, asma yaprağına sarılmış iç pilav ve et karışımından oluşan nefis bir Türk yemeğidir.",
      calories: "400 kcal",
      prepTime: "30 dakika",
      cookTime: "45 dakika",
      servings: "6 Kişilik",
      ingredients: ["500 gr asma yaprağı", "300 gr kıyma", "1 su bardağı pirinç", "1 adet soğan", "Baharatlar: tuz, karabiber, pul biber"],
      steps: [
        "İç harcı hazırlayın, kıymayı soğan, pirinç ve baharatlarla karıştırın.",
        "Asma yapraklarını hazırlayın ve harcı içine yerleştirip sarın.",
        "Sarmaları tencereye dizin ve üzerini geçecek kadar su ekleyin.",
        "Düşük ısılarda 45 dakika pişirin."
      ],
      servingTips: ["Yoğurtla servis edebilirsiniz."],
      tips: ["Sarmaların gevrek olmaması için suyun kaynamaya başlamasından sonra altını kısıp pişirin."]
    }
  ];

const DishDetailPage = () => {
  const { id } = useParams();
  const dish = dishes.find((d) => d.id === parseInt(id));

  if (!dish) {
    return <Typography>Yemek bulunamadı!</Typography>;
  }

  return (
    <Container maxWidth="lg" className="dish-detail-container">
      <Paper elevation={3} className="dish-header ">
        <Typography variant="h4" className="dish-title-page">
          {dish.title}
        </Typography>
        <img src={dish.imageUrl} alt={dish.title} className="dish-image-detail" />
        <Typography className="dish-description">{dish.description}</Typography>
      </Paper>

      {/* Yemek Bilgileri */}
      <Paper className="info-card info-card-color">
        <Typography variant="h6" style={{ display: "flex", alignItems: "center" }}>
          Yemek Bilgileri
        </Typography>
        <p><LocalDining /> {dish.servings}</p>
        <p><LocalFireDepartment /> {dish.calories}</p>
        <p><AccessTime /> Hazırlık: {dish.prepTime}</p>
        <p><Restaurant /> Pişirme: {dish.cookTime}</p>
      </Paper>

      {/* Malzemeler */}
      <Paper className="info-card ">
        <Typography variant="h6" style={{ display: "flex", alignItems: "center" }}>
          <Kitchen style={{ marginRight: "10px" }} /> Malzemeler
        </Typography>
        <ul>{dish.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}</ul>
      </Paper>

      {/* Tarif Adımları */}
      <Paper className="info-card ">
        <Typography variant="h6" style={{ display: "flex", alignItems: "center" }}>
          <PanTool style={{ marginRight: "10px" }} /> Nasıl Yapılır?
        </Typography>
        <ul>{dish.steps.map((step, i) => <li key={i}>{step}</li>)}</ul>
      </Paper>

      {/* Servis Önerisi */}
      <Paper className="info-card info-card-blue">
        <Typography variant="h6" style={{ display: "flex", alignItems: "center" }}>
          <ThumbUp style={{ marginRight: "10px" }} /> Servis Önerisi
        </Typography>
        <ul>{dish.servingTips.map((tip, i) => <li key={i}>{tip}</li>)}</ul>
      </Paper>

      {/* Püf Noktaları */}
      <Paper className="info-card info-card-color">
        <Typography variant="h6" style={{ display: "flex", alignItems: "center" }}>
          <Lightbulb style={{ marginRight: "10px" }} /> Püf Noktaları
        </Typography>
        <ul>{dish.tips.map((tip, i) => <li key={i}>{tip}</li>)}</ul>
      </Paper>
    </Container>
  );
};

export default DishDetailPage;