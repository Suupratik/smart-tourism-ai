const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/Payment");

let razorpay;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
}
// create order
const createOrder = async (req, res) => {
  try {

  if (!razorpay) {
  console.error("Razorpay not initialized. Check .env keys");
  return res.status(500).json({
    success: false,
    message: "Razorpay not configured"
  });
}

const { amount, placeId } = req.body;

if (!amount || !placeId) {
  return res.status(400).json({
    success: false,
    message: "amount and placeId required"
  });
}

const receipt = `place_${Date.now()}`;

    const order = await razorpay.orders.create({
      amount: Number(amount),
      currency: "INR",
      receipt
    });

    res.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Order create failed"
    });
  }
};

// verify payment
const verifyPayment = async (req, res) => {
  try {
    const {
      placeId,
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const sign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (sign !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature"
      });
    }

    const payment = await Payment.create({
      placeId,
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      status: "paid"
    });

    res.json({
      success: true,
      message: "Payment verified",
      payment
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Payment verification failed"
    });
  }
};

const getMyTickets = async (req, res) => {
  try {
    const tickets = await Payment.find().sort({ createdAt: -1 });

    res.json(tickets);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tickets"
    });
  }
};
module.exports = { createOrder, verifyPayment, getMyTickets };