const wishlistModel = require("../model/wishlist.model");

const getList = async (id) => {
    const data = await wishlistModel.find({
        "userId._id": id,
    });
    return data;
};

const addList = async (body) => {
    const data = await wishlistModel.create(body);
    return data;
};



const deleteList = async (id) => {
    const data = await wishlistModel.deleteOne({ _id: id });
    console.log(data);
    return data;
};

module.exports = { getList, addList, deleteList };
