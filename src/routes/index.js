const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");

router.get("/", (_, res) => {
  res.send("Hell on World!!!");
});

router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;
