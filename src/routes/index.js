const express = require("express");
const router = express.Router();

const userRoutes = require("../routes/userRoutes.js");
const authRoutes = require("../routes/authRoutes.js");

router.use("/api", userRoutes);
router.use("/api", authRoutes);

router.get("/", (req, res) => {
  res.send("Hell on World!!!");
});

module.exports = router;
