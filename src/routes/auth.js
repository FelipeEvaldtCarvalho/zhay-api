const router = require("express").Router();
const authController = require("../controllers/authController");
const { loged } = require("../middlewares/index.js");

router.post("/login", async (req, res) => {
  try {
    const login = await authController.login(req.body);
    res.status(200).send(login);
  } catch ({ message }) {
    const { status, msg } = JSON.parse(message);
    res.status(status).send(msg);
  }
});

router.get("/loged", loged, async (_, res) => {
  try {
    res.status(200).send("Loged");
  } catch ({ message }) {
    const { status, msg } = JSON.parse(message);
    res.status(status).send(msg);
  }
});

module.exports = router;
