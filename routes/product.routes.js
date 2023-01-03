const { sanitizeFilter } = require("mongoose");
const {
  getAllProducts,
  getCategory,
  sortByPrice,
  descSort,
  descSortRating,
  getById,
  getColorItems
} = require("../controller/productController");

const productRouter = require("express").Router();

// Route for getting all the products of every category  .... we can say like all the database  https://localhost:3005/allproducts
productRouter.get("/allproducts", async (req, res) => {
  let products;
  try {
    products = await getAllProducts();
  } catch (error) {
    return res.status(400).send("some error occured while fetching the data");
  }
  return res.send(products);
});

//route for getting individual product

productRouter.get("/product", async (req, res) => {
  const id = req.query.id;
  let data;
  try {
    data = await getById(id);
  } catch (error) {
    return res.status(400).send("something went wrong");
  }
  return res.send(data);
});
// Route for sorting the data in database from low to high or high to low in price
productRouter.get("/products", async (req, res) => {
  let sort = req.query.sort;
  let category = req.query.category;
  let color = req.query.color;
  if (category) {
    category = category.toLowerCase();
  }
  if (color) {
    color = color.toLowerCase();
  }
  let data;

  // if only sort is given then url will be
  if (sort !== undefined && category === undefined && color === undefined) {
    // https://localhost:3005/products?sort=lh
    if (sort === "lh") {
      try {
        const result = await getAllProducts();
        data = await sortByPrice(result);
      } catch (error) {
        return res.status(404).send({ message: "No data found" });
      }
    }

    //  https://localhost:3005/products?sort=hl
    else if (sort === "hl") {
      try {
        const result = await getAllProducts();
        data = await descSort(result);
      } catch (error) {
        return res.status(404).send({ message: "No data found" });
      }
    }

    //https://localhost:3005/products?sort=rated
    else if (sort === "rated") {
      try {
        const result = await getAllProducts();
        data = await descSortRating(result);
      } catch (error) {
        return res.status(404).send({ message: "No data found" });
      }
    }
  }

  // else if only category is given then url will be https://localhost:3005/products?category={categoryname}
  else if (sort === undefined && category !== null && color === undefined) {
    try {
      data = await getCategory(category);
    } catch (error) {
      return res.status(404).send({ message: "No data found over here" });
    }
  }

  // else if category and sort both are given    https://localhost:3005/products?category={categoryname} & sort=lh
  else if (sort === "lh" && category !== undefined && color === undefined) {
    try {
      let result = await getCategory(category);
      data = await sortByPrice(result);
    } catch (error) {
      return res.status(404).send({ message: "No data found over here" });
    }
  }

  // https://localhost:3005/products?category={categoryname} & sort=hl
  else if (sort === "hl" && category !== undefined && color === undefined) {
    try {
      let result = await getCategory(category);
      data = await descSort(result);
    } catch (error) {
      return res.status(404).send({ message: "No data found over here" });
    }
  }

  //https://localhost:3005/products?category={categoryname} & sort=rated
  else if (sort === "rated" && category !== undefined && color === undefined) {
    try {
      let result = await getCategory(category);
      data = await descSortRating(result);
    } catch (error) {
      return res.status(404).send({ message: "No data found over here" });
    }
  }


  //if color and category is there then filtering according to color https://localhost:3005/products?color=black&category=wallet
  else if (sort === undefined && category !== undefined && color !== undefined) {
    try {
      data = await getColorItems(color, category);
    } catch (error) {
      return res.status(404).send({ message: "No data found over here" });
    }
  }


  // if sort is also given then sorting and filtering according to require
  else if (sort === "lh" && category !== undefined && color !== undefined) {
    try {
      let result = await getColorItems(color, category);
      data = await sortByPrice(result);
    } catch (error) {
      return res.status(404).send({ message: "No data found over here" });
    }
  }


  //in this case sort is high to low and filtering and color are also there
  else if (sort === "hl" && category !== undefined && color !== undefined) {
    try {
      let result = await getColorItems(color, category);
      data = await descSort(result);
    } catch (error) {
      return res.status(404).send({ message: "No data found over here" });
    }
  }

  //in this case sort is high to low and filtering and color are also there
  else if (sort === "rated" && category !== undefined && color !== undefined) {
    try {
      let result = await getColorItems(color, category);
      data = await descSortRating(result);
    } catch (error) {
      return res.status(404).send({ message: "No data found over here" });
    }
  }
  console.log("data", data);
  if (!data || data.length === 0) {
    return res.status(404).send({ message: "No data found over here" });
  }


  return res.send(data);
});



module.exports = productRouter;
