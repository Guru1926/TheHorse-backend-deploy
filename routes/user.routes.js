const { Router } = require("express");
const JWT = require("jsonwebtoken");
const { registeruser, loginuser } = require("../controller/user.controller");
const router = Router();
router.post("/register", async (req, res) => {
  try {
    const body = req.body;
    const myuser = await registeruser(body);
    return res.send({ myuser });
  } catch (err) {
    if (err.message == "user alredy exists") {
      res.status(400).send(err.message);
    } else {
      res.status(500).send("error in server");
    }
    console.log(err, "error in register route");
  }
});
router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const myuser = await loginuser(body);
    return res.send({ myuser });
  } catch (err) {
    if (
      err.message == "please register first and user does not exist !" ||
      err.message == "please enter valid password!"
    ) {
      res.status(400).send(err.message);
    } else {
      res.status(500).send("error in server");
    }
    console.log(err, "error in login route");
  }
});
router.get("/loggedinuser", (req, res, next) => {
  let authorization = req.headers.authorization;

  if (authorization) {
    let token = authorization.split(" ").pop();
    try {
      if (token) {
        JWT.verify(token, "horse_login_signup");
        const user = JWT.decode(token);
        req.user = user;
        return res.status(200).send({ data: user });
      }
    } catch (err) {
      return res.status(400).send({ message: "invalid token" });
    }
  } else {
    return res.status(401).send({ message: "no token provided" });
  }
});
module.exports = router;
