const ProductModel = require("../models/products");

class Products {
  async create(data) {
    const newProducts = await ProductModel.create(data);
    return newProducts;
  }

  async getAll({ limit, page, offset }) {
    const products = await ProductModel.paginate(
      {},
      { limit: limit || 30, page: page || 1}
    );
    return products;
  }

  async getOne(productId) {
    const product = await ProductModel.findById(productId);
    return product;
  }
}

module.exports = Products;
