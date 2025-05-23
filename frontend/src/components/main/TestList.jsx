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
