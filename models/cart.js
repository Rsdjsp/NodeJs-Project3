const { mongoose } = require("../config/db");

const { Schema } = mongoose;

const cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: Number,
    },
  ],
});

const CartModel = mongoose.model("cart", cartSchema);

module.exports = CartModel;
