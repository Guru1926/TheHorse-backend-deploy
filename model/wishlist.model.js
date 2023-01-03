const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema({
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

const wishlistModel = mongoose.model("wishlist", wishlistSchema);

module.exports = wishlistModel;
