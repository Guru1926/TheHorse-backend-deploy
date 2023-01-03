const productModel = require("../model/product.model");

//to sort from low to high
const sortByPrice = async (data) => {
  const filtered = await data.sort(function (a, b) {
    return a.price - b.price;
  });
  return filtered;
};

//to sort from high to low
const descSort = async (data) => {
  const filtered = await data.sort(function (a, b) {
    return b.price - a.price;
  });
  return filtered;
};

//to sort on the basis of rating from high to low
const descSortRating = async (data) => {
  const filtered = await data.sort(function (a, b) {
    return b.rating - a.rating;
  });
  return filtered;
};

//to get all the products in the database
const getAllProducts = async () => {
  let data = await productModel.find();
  return data;
};

//to get product from  a unique category
const getCategory = async (category) => {
  let result = await productModel.find({ TAG2: category });
  return result;
};


// to find according to color
const filterColor = async (color, data) => {
  let result;
  if (color) {
    result = await data.filter((ele) => {
      if (ele.color)
        return ele.color.toLowerCase() === color;
      else return null;
    })
  }

  return result;
}

// get items by filtering according to color && category
const getColorItems = async (color, category) => {
  let result = await getCategory(category);
  let data = await filterColor(color, result);
  return data;
}



// to get individual product
const getById = async (id) => {
  const result = await productModel.findById(id);
  return result;
};

//exporting the controls or like functions
module.exports = {
  getAllProducts,
  getCategory,
  sortByPrice,
  descSort,
  descSortRating,
  getById,
  getColorItems,
};