require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const connectdb = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const placeRoutes = require("./routes/placeRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const otpRoutes = require("./routes/otpRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// ✅ create HTTP server
const server = http.createServer(app);


// =====================
// ✅ FINAL CORS FIX
// =====================
app.use(cors({
  origin: true,            // allow all origins (safe for your project stage)
  credentials: true
}));


// =====================
// ✅ SOCKET.IO CORS FIX
// =====================
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


// =====================
// ✅ MIDDLEWARE
// =====================
app.use(express.json());


// =====================
// ✅ STATIC FILES
// =====================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// =====================
// ✅ ROUTES
// =====================
app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/otp", otpRoutes);


// =====================
// ✅ HEALTH CHECK
// =====================
app.get("/", (req, res) => {
  res.send("Smart Tourism API working");
});


// =====================
// ✅ START SERVER
// =====================
const PORT = process.env.PORT || 5600;

connectdb()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });