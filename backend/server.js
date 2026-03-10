require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectdb = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const placeRoutes = require("./routes/placeRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectdb();

// static images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Smart Tourism API working");
});

const PORT = process.env.PORT || 5600;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});