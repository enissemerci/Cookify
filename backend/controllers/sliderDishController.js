const fs = require("fs");
const path = require("path");

// JSON dosyasının yolu
const filePath = path.join(__dirname, "../data/sliderDishes.json");

// Tüm yemekleri getir
const getAllDishes = (req, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Veri okunamadı" });
        }
        res.json(JSON.parse(data));
    });
};

// ID'ye göre tek bir yemeği getir
const getDishById = (req, res) => {
    const dishId = parseInt(req.params.id);

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Veri okunamadı" });
        }
        const dishes = JSON.parse(data);
        const dish = dishes.find((d) => d.id === dishId);

        if (!dish) {
            return res.status(404).json({ error: "Yemek bulunamadı" });
        }

        res.json(dish);
    });
};

module.exports = { getAllDishes, getDishById };