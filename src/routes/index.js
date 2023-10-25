const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");

router.get("/", (req, res) => {
  res.send("Hell on World!!!");
});

router.get("/order-detail/:id", async (req, res) => {
  const tigas = await OrderController.getOrderDetails(req.body.id);
  res.send(tigas);
});

module.exports = router;
