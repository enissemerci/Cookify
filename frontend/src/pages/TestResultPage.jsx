import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import kokteylTest from "../data/tests/test_kokteyl.json";
import yemekTest from "../data/tests/test_yemek_karakteri.json";
import "./TestResultPage.css";

const TestResultPage = () => {
  const { result } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const testId = query.get("test");

  let test;
  if (testId === "kokteyl") test = kokteylTest;
  else if (testId === "yemek_karakteri") test = yemekTest;
  else return <p>Test verisi alınamadı</p>;

  const data = test.results?.[result];

  if (!data) {
    return (
      <div className="result-container">
        <h2 className="result-title">Sonuç Bulunamadı</h2>
        <p className="result-description">Bir hata oluştu.</p>
        <button className="retry-btn" onClick={() => navigate("/")}>Ana Sayfa</button>
      </div>
    );
  }

  return (
    <div className="result-container">
      <h2 className="result-title">{data.title}</h2>
      <img src={data.image} alt={data.title} className="result-image" />
      <p className="result-description">{data.description}</p>
      <button className="retry-btn" onClick={() => navigate("/")}>Ana Sayfa</button>
    </div>
  );
};

export default TestResultPage;
