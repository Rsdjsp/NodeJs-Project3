const express = require("express");
const validateToken = require("../middleware/validate");
const Payments = require("../services/payments");

function payments(app) {
  const router = express.Router();
  app.use("/api/payments", router);

  const pay = new Payments();

  router.post("/intent", async (req, res) => {
    const intent = await pay.createIntent(req.body.amount);
    return res.json(intent);
  });

  router.post("/webhook", async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const result = await pay.createEvent(req.body, sig);
    if (result.success) {
      return res.status(200).send();
    }
    return res.status(400).send();
  });
  router.post("/create-payment", validateToken, async (req, res) => {
    const response = await pay.createPayment(res);
  });
  router.get("/execute-payment", validateToken, async (req, res) => {
    const response = await pay.executePayment(req, res);
  });
}

module.exports = payments;
