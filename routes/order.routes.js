const { Router } = require("express");
const { getOrder, addOrder } = require("../controller/order.controller");

const router = Router();

router.get("/", async (req, res) => {
    const id = req.query.id;
    try {
        const data = await getOrder(id);
        res.status(200).send({ data });

    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
});

router.post("/", async (req, res) => {
    const body = req.body;
    try {
        const data = await addOrder(body);
        res.status(200).send({ data });

    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }

});



module.exports = router;
