const { Router } = require("express");
const {
  getCart,
  addCart,
  updateCart,
  deleteCart,
} = require("../controller/cart.controller");

const router = Router();

router.get("/", async (req, res) => {
  const id = req.query.id;
  const data = await getCart(id);

  // console.log(id);

  try {
    if (data) {
      res.status(200).send({
        data,
      });
    } else {
      res.status(404).send({
        message: "Already presented cart",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  const id = req.query.id;
  const body = req.body;
  const data = await addCart(body, id);

  try {
    if (data) {
      res.status(200).send({ data });
    } else {
      res.status(200).send({
        message: "Cart already presented",
      });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { quantity } = req.body;
  const data = await updateCart(id, quantity);

  try {
    if (data) {
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await deleteCart(id);
    if (data) {
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
