const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/sliderDesserts.json");

const getAllDesserts = (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Veri okunamadı" });
    res.json(JSON.parse(data));
  });
};

const getDessertById = (req, res) => {
  const dessertId = parseInt(req.params.id);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Veri okunamadı" });
    const desserts = JSON.parse(data);
    const dessert = desserts.find((d) => d.id === dessertId);
    if (!dessert) return res.status(404).json({ error: "Tatlı bulunamadı" });
    res.json(dessert);
  });
};

module.exports = { getAllDesserts, getDessertById };
