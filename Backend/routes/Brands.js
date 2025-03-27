const express = require("express");
const { fetchBrands, createBrand } = require("../controller/Brand");

const router = express.Router();

//base path for products as it is already added in base path
router.post("/", createBrand).get("/", fetchBrands);
exports.router = router;
