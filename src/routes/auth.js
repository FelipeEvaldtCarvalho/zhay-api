const router = require("express").Router();
const authController = require("../controllers/authController");
const { loged } = require("../middlewares/index.js");

router.post("/login", async (req, res) => {
  try {
    const { email, password_hash } = req.body;
    const login = await authController.login({ email, password_hash });
    res.status(200).send(login);
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/loged", loged, async (_, res) => {
  try {
    res.status(200).send("Loged");
  } catch ({ message }) {
    res.send(message);
  }
});

router.post("/confirm-email", async (req, res) => {
  try {
    const { token } = req.body;
    const confirm = await authController.confirmEmail(token);
    console.dir(confirm);
    res.status(200).send("Email confirmed!");
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = router;
