const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3005;
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
app.get('/*', (req, res) => {
  res.send('Page Not found');
})

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("error occured" + err);
  });
