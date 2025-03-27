const express = require("express");
const {
  createProduct,
  fetchAllProducts,
  fetchProductsById,
  updateProduct,
} = require("../controller/Product");
const router = express.Router();

//base path for products as it is already added in base path
router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fetchProductsById)
  .patch("/:id", updateProduct);
exports.router = router;
