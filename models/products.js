const { mongoose } = require("../config/db");
const mongoosePaginate = require('mongoose-paginate-v2');


const { Schema } = mongoose;

const productsSchema = new Schema({
  name: String,
  stock: Number,
  price: Number,
  img: String,
  logo: String,
  picture: String,
  sizes: Array,
  colors: Array,
});

productsSchema.plugin(mongoosePaginate)

const ProductModel = mongoose.model("products", productsSchema);

module.exports = ProductModel;
