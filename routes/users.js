const express = require("express");
const validateToken = require("../middleware/validate");
const User = require("../services/users");

function users(app) {
  const router = new express.Router();
  app.use("/api/users", router);
  const userService = new User();

  router.post("/", async (req, res) => {
    const users = await userService.create(req.body);
    return res.status(200).json(users);
  });

  router.get("/", validateToken, async (req, res) => {
    const users = await userService.getAll();
    return res.status(200).json(users);
  });

  router.get("/:id", validateToken, async (req, res) => {
    const users = await userService.getById(req.params.id);
    return res.status(200).json(users);
  });

  router.get("/user", async (req, res) => {
    const users = await userService.getByEmail(req.body);
    return res.status(200).json(users);
  });

  router.post("/update/:id", validateToken, async (req, res) => {
    const users = await userService.update(req.params.id, req.body);
    return res.status(200).json(users);
  });

  router.post("/delete/:id", validateToken, async (req, res) => {
    const users = await userService.delete(req.params.id, req.user.cart);
    return res.status(200).json(users);
  });
}

module.exports = users;
