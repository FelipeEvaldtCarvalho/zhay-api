const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hell on World!!!");
});

module.exports = router;
