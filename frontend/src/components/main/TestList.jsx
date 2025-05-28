import React from "react";
import { useNavigate } from "react-router-dom";
import "./TestList.css";

const tests = [
  {
    id: "kokteyl",
    title: "Hangi kokteyl sensin?",
    image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748071699/s-8de3b9856688e3ab3e92cd4400b4e2881e4cd263_e0j6q4.jpg",
    description: "Ruhunun tadına var, seni en iyi yansıtan kokteyli bul!"
  },
  {
  id: "yemek_karakteri",
  title: "Kişiliğin Bir Yemek Olsaydı Ne Olurdu?",
  image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748104127/s-a7b1a8243d3fcc3b71e1a6794f45d21defa88892_jmqxtx.jpg",
  description: "Kişiliğini en iyi anlatan yemek hangisi? Hadi keşfet!"
  },
  {
  id: "saglikli_beslenme",
  title: "Ne Kadar Sağlıklı Besleniyorsun?",
  image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748414159/s-c5cb9d877801b108bc1ce5d1058e737936cd5645_mbln31.jpg",
  description: "Yeme alışkanlıklarına göre sağlıklı mısın öğren!"
  },
  {
  id: "tatli_millet",
  title: "Seçtiğin Tatlılara Göre Hangi Millettensin?",
  image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748426393/s-7ae744c83188245ff7a152191bfdc70f418c41ea_blrcfm.jpg",
  description: "Tatlı zevkine göre hangi mutfağa aitsin? Hemen öğren!"
}



  // Daha fazla test buraya eklenebilir
];

const TestList = () => {
  const navigate = useNavigate();

  return (
    <div className="test-list-section">
      <h2 className="test-list-title">🧠 Kişiliğine Göre Testler</h2>
      <div className="test-list-grid">
        {tests.map((test) => (
          <div
            key={test.id}
            className="test-card"
            onClick={() => navigate(`/test/${test.id}`)}
          >
            <img src={test.image} alt={test.title} />
            <h3>{test.title}</h3>
            <p>{test.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestList;