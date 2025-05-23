const express = require("express");
const router = express.Router();
const { getAllDesserts, getDessertById } = require("../controllers/sliderDessertController");

router.get("/", getAllDesserts);
router.get("/:id", getDessertById);

module.exports = router;
