const orderModel = require("../model/order.model");

const getOrder = async (id) => {
    const data = await orderModel.find({
        "userId._id": id,
    });
    return data;
};

const addOrder = async (body) => {
    const data = await orderModel.create(body);
    return data;
};



module.exports = { getOrder, addOrder };
