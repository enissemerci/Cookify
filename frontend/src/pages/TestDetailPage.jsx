import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import kokteylTest from "../data/tests/test_kokteyl.json";
import yemekTest from "../data/tests/test_yemek_karakteri.json";
import "./TestDetailPage.css";

const TestDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [scores, setScores] = useState({});

  let test;
  if (id === "kokteyl") test = kokteylTest;
  else if (id === "yemek_karakteri") test = yemekTest;
  else return <p>Test bulunamadı.</p>;

  const totalQuestions = test.questions.length;
  const current = test.questions[currentQuestion];

  const handleOptionClick = (value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = value;
    setAnswers(updatedAnswers);

    const updatedScores = { ...scores };
    updatedScores[value] = (updatedScores[value] || 0) + 1;

    if (currentQuestion < totalQuestions - 1) {
      setScores(updatedScores);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = Object.entries(updatedScores).sort((a, b) => b[1] - a[1])[0][0];
      navigate(`/test-result/${result}?test=${id}`);
    }
  };

  const goBack = () => setCurrentQuestion((prev) => Math.max(prev - 1, 0));

  return (
    <div className="test-container">
      <h2 className="test-title">{test.title}</h2>
      {current.image && <img src={current.image} alt="Soru görseli" className="test-image" />}
      <p className="question-text">{current.question}</p>
      <div className="option-grid">
        {current.options.map((opt, i) => (
          <button key={i} onClick={() => handleOptionClick(opt.value)} className="option-btn">
            {opt.text}
          </button>
        ))}
      </div>

      <div className="navigation-buttons">
        {currentQuestion > 0 && (
          <button onClick={goBack} className="nav-btn">Geri</button>
        )}
      </div>
    </div>
  );
};

export default TestDetailPage;
