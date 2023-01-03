const express = require("express");
const cors = require("cors");
const connect = require("./db/connect");
const productRouter = require("./routes/product.routes");
const userRouter = require("./routes/user.routes");
const cartRouter = require("./routes/cart.routes");
const wishlistRouter = require("./routes/wishlist.routes");
const orderRouter = require("./routes/order.routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", productRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);
app.use("/order", orderRouter);

connect()
  .then(() => {
    app.listen(3005, () => {
      console.log("server listening on port 3005");
    });
  })
  .catch((err) => {
    console.log("error occured" + err);
  });
