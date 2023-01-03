const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  id: Number,
  img1: String,
  img2: String,
  title: String,
  description: String,
  price: Number,
  discount: Number,
  rating: Number,
  quantity: Number,
  Tag1: String,
  TAG2: String,
  color: String,
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
