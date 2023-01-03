const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  products: {
    id: Number,
    img1: String,
    title: String,
    price: Number,
    discount: Number,
    quantity: Number,
    color: String,
  },
  userId: {
    _id: mongoose.Types.ObjectId,
  },
});

const cartModel = mongoose.model(" cart", cartSchema);

module.exports = cartModel;
