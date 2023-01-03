const { Router } = require("express");
const { getList, addList, deleteList } = require("../controller/wishlist.controller");

const router = Router();

router.get("/", async (req, res) => {
    const id = req.query.id;
    try {
        const data = await getList(id);
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
        const data = await addList(body);
        res.status(200).send({ data });

    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }



});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await deleteList(id);
        res.status(200).send(data);

    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
