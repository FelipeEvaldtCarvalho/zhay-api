const router = require("express").Router();
const userController = require("../controllers/userController");
const { check, validationResult } = require("express-validator");

router.post(
  "/create",
  [
    check("name").exists().isLength({ min: 5 }),
    check("password_hash").exists().isLength({ min: 6 }),
    check("email").exists().isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newUser = await userController.createUser(req.body);

      res.status(201).json({
        status: "success",
        //TODO: DELETE DATA PROP
        data: newUser,
        //
        message: "User created successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
);

// router.put("/update/:id", async (req, res) => {
//   try {
//     const user = await userController.updateUser(req.params.id, req.body);
//     res.status(200).json({
//       status: "success",
//       data: user,
//       message: "User updated successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// });

// router.get("/find");

// router.get("/get-users", async (req, res) => {
//   const { perPage, currentPage } = req.body;
//   try {
//     const response = perPage
//       ? await userController.getAllUsers({ perPage, currentPage })
//       : await userController.getAllUsers();

//     res.status(200).send(response);
//   } catch (error) {
//     res.send(error.message);
//   }
// });

module.exports = router;
