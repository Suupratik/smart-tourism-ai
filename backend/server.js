require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http"); // ✅ ADD
const { Server } = require("socket.io"); // ✅ ADD

const connectdb = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const placeRoutes = require("./routes/placeRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const otpRoutes = require("./routes/otpRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// ✅ create HTTP server
const server = http.createServer(app);

// ✅ socket setup
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (data) => {
    io.emit("receive_message", data); // broadcast
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// middleware
app.use(cors());
app.use(express.json());

connectdb();

// static images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/otp", otpRoutes);

app.get("/", (req, res) => {
  res.send("Smart Tourism API working");
});

const PORT = process.env.PORT || 5600;

// ❌ REMOVE app.listen
// ✅ USE server.listen
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});