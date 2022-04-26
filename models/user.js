const { mongoose } = require("../config/db");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  provider: String,
  idProvider: String,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
  },
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
