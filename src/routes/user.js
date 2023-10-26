const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/get-users", async (req, res) => {
  const { perPage, currentPage } = req.body;

  const response = perPage
    ? await userController.getAllUsers({ perPage, currentPage })
    : await userController.getAllUsers();

  res.send(response);
});

module.exports = router;
