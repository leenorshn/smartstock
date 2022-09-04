const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  code_bar: { type: String, required: true, unique: true },
  origin_name: String,
  local_name: String,
  model: String,
  quantity: { type: Number, required: true, default: 0 },
  date: { type: Number, required: true, default: Date.now() },
});

const Product =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema, "products");

module.exports = Product;
