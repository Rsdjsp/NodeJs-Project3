const CartModel = require("../models/cart");
const UserModel = require("../models/user");

class Users {
  async create(userInfo) {
    const user = await UserModel.create(userInfo);
    return user;
  }

  async getAll() {
    const user = await UserModel.find({});
    return user;
  }

  async getById(id) {
    const user = await UserModel.findById(id);
    return user;
  }

  async getByEmail(email) {
    const user = await UserModel.findOne({ email: email });
    return user;
  }

  async update(id, userData) {
    const user = await UserModel.findByIdAndUpdate(id, userData, { new: true });
    return user;
  }

  async delete(id, cartId) {
    const user = await UserModel.findByIdAndDelete(id);
    const cart = await CartModel.findByIdAndDelete(cartId);
    return { user, cart };
  }
}
module.exports = Users;
