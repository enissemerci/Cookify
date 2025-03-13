const express = require("express");
const router = express.Router();
const { getAllDishes, getDishById } = require("../controllers/sliderDishController");

// Tüm yemekleri getir
router.get("/", getAllDishes);

// Belirli bir yemeği ID'ye göre getir
router.get("/:id", getDishById);

module.exports = router;