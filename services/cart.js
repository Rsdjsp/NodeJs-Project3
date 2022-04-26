const CartModel = require("../models/cart");
const UserModel = require("../models/user");

class Cart {
  async newCart(userId) {
    const newCart = { user: userId };
    const cart = await CartModel.create(newCart);
    const newUserCart = await UserModel.updateOne(
      { _id: userId },
      { $set: { cart: cart._id } }
    );
    return cart;
  }

  async newCartProduct({ products, quantity }, cartId) {
    if (!products || !quantity || quantity === 0) {
      return { message: "Requeriments uncomplete" };
    } else {
      const newProduct = await CartModel.updateOne(
        { _id: cartId },
        { $push: { products: { product: products, quantity: quantity } } }
      );

      return newProduct;
    }
  }

  async getAll(cartId) {
    const products = await CartModel.findById(cartId).populate(
      "products.product",
      "name price"
    );

    return products;
  }

  async deleteProduct({ product }, cartId) {
    const verify = await CartModel.findById(cartId);
    const deleteProduct = verify.products.find(
      (productDelete) => productDelete.product.toString() === product
    );

    const cart = await CartModel.updateOne(
      { _id: cartId },
      {
        $pull: { products: deleteProduct },
      }
    );
    return cart;
  }
}

module.exports = Cart;
