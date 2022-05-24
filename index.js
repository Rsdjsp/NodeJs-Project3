const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const { port, env, callback_url } = require("./config");

//Importando routers
const payments = require("./routes/payments");
const auth = require("./routes/auth");
const products = require("./routes/products");
const users = require("./routes/users");
const cart = require("./routes/cart");

const app = express();
app.use("/api/payments/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000","https://react-ecommerce-93fdd.web.app"],
  })
);
app.use(cookies());

const { connection } = require("./config/db");

connection();

// Utilizando las rutas
payments(app);
auth(app);
products(app);
users(app);
cart(app);

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

app.listen(port, () => {
  console.log("Modo:", env);
  console.log("listening on: http://localhost:" + port);
  console.log(callback_url);
});
