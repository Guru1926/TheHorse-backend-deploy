const cartModel = require("../model/cart.model");

const getCart = async (id) => {
  const data = await cartModel.find({
    "userId._id": id,
  });

  //   console.log(data, id);
  return data;
};

const addCart = async (body, id) => {
  const result = await getCart(id);

  //   console.log(result);
  let ans;
  if (result) {
    ans = result.filter((el) => el.products.id == body.products.id);
  }
  console.log(ans);
  let data;
  if (ans.length === 0) {
    data = await cartModel.create(body);
  }
  console.log(data);
  return data;
};

const updateCart = async (id, quantity) => {
  const data = await cartModel.findByIdAndUpdate(
    { _id: id },
    { $set: { "products.quantity": quantity } },
    { new: true }
  );
  //   console.log(quantity);
  return data;
};

const deleteCart = async (id) => {
  const data = await cartModel.deleteOne({ _id: id });
  console.log(data);
  return data;
};

module.exports = { getCart, addCart, updateCart, deleteCart };
