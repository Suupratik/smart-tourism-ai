const express = require("express");
const router = express.Router();

const { createOrder, verifyPayment, getMyTickets } = require("../controller/paymentController");

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);
router.get("/my-tickets", getMyTickets);
module.exports = router;