const express = require("express");
const tokenToCookie = require("../helpers/tokenToCookie");
const validateToken = require("../middleware/validate");
const Auth = require("../services/auth");

function auth(app) {
  const router = express.Router();
  app.use("/api/auth", router);
  const authService = new Auth();

  router.post("/signup", async (req, res) => {
    const newUser = await authService.signUp(req.body);
    return tokenToCookie(res, newUser);
  });
  router.post("/login", async (req, res) => {
    const newUser = await authService.logIn(req.body);
    return tokenToCookie(res, newUser);
  });

  router.post("/logout", validateToken, (req, res) => {
    return tokenToCookie(res);
  });

  router.get("/validate", validateToken, (req, res) => {
    return res.json(req.user);
  });
}

module.exports = auth;
