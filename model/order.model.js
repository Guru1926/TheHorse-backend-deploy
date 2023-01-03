const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
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

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
