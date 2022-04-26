const express = require("express");
const validateToken = require("../middleware/validate");
const Product = require("../services/products");

function products(app) {
  const router = express.Router();
  app.use("/products", router);
  const productService = new Product();

  router.post("/", validateToken, async (req, res) => {
    const results = await productService.create(req.body);
    return res.json(results);
  });

  router.get("/", async (req, res) => {
    const results = await productService.getAll(req.query);
    return res.json(results);
  });

  router.get("/:id", async (req, res) => {
    const results = await productService.getOne(req.params.id);
    return res.json(results);
  });
}

module.exports = products;
