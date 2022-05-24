const Users = require("./users");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");
const bcrypt = require("bcrypt");
const Cart = require("./cart");

class Auth {
  constructor() {
    this.users = new Users();
    this.cart = new Cart();
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async getToken(user) {
    const token = jwt.sign(user.toJSON(), jwt_secret, { expiresIn: "1d" });
    user.password = undefined;
    return { sucess: true, user, token };
  }

  async signUp(userData) {
    if (!userData.email || !userData.password) {
      return { succes: false, message: "Please insert all credentials " };
    } else {
      const verifyUser = await this.users.getByEmail(userData.email);
      if (verifyUser) {
        return { succes: false, message: "Usuario ya registrado" };
      } else {
        const passwordCrypt = await this.hashPassword(userData.password);
        userData.password = passwordCrypt;
        const user = await this.users.create(userData);
        const cart = await this.cart.newCart(user._id);
        user.cart = cart._id;
        return this.getToken(user);
      }
    }
  }

  async logIn({ email, password }) {
    if (!email || !password) {
      return { succes: false, message: "Please insert credentials " };
    } else {
      const user = await this.users.getByEmail(email);
      const comparePassword = await bcrypt.compare(password, user.password);
      if (comparePassword) {
        return this.getToken(user);
      } else {
        return { sucess: false, message: "The credentials are incorrect" };
      }
    }
  }
}

module.exports = Auth;
