const express = require("express");
const router = express.Router();
const { getProducts } = require("../controllers/filterController");

router.get("/products", getProducts);

module.exports = router;
