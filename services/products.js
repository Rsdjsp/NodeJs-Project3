const ProductModel = require("../models/products");

class Products {
  async create(data) {
    const newProducts = await ProductModel.create(data);
    return newProducts;
  }

  async getAll({ limit, page }) {
    const products = await ProductModel.paginate(
      {},
      { limit: limit || 148, page: page || 1 }
    );
    return products;
  }

  async getOne(productId) {
    const product = await ProductModel.findById(productId);
    return product;
  }

  async bestSellers() {
    const products = await ProductModel.find({});
    return products.slice(20, 40);
  }
  async offers() {
    const products = await ProductModel.find({});
    return products.slice(40, 60);
  }
  async newCollection() {
    const products = await ProductModel.find({});
    return products.slice(60, 100);
  }
  async Liquidation() {
    const products = await ProductModel.find({});
    return products.slice(100, 140);
  }
}

module.exports = Products;
