const express = require("express");
const validateToken = require("../middleware/validate");
const Cart = require("../services/cart");

function cart(app) {
  const router = express.Router();
  app.use("/api/cart", router);
  const cartService = new Cart();

  router.post("/", validateToken, async (req, res) => {
    const cart = await cartService.newCartProduct(req.body, req.user.cart);
    return res.status(200).json(cart);
  });

  router.get("/", validateToken, async (req, res) => {
    const cart = await cartService.getAll(req.user.cart);
    return res.status(200).json(cart);
  });

  router.post("/delete", validateToken, async (req, res) => {
    const cart = await cartService.deleteProduct(req.body, req.user.cart);
    return res.status(200).json(cart);
  });
  router.post("/update", validateToken, async (req, res) => {
    const { amount, product } = req.body;
    const cart = await cartService.update(req.user.cart, amount, product);
    return res.status(200).json(cart);
  });
}

module.exports = cart;
