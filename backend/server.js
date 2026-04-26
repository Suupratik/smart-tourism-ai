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

// ✅ CORS (important for deployment)
app.use(cors({
  origin: "*", // later replace with Vercel URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ socket setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
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

// middleware
app.use(express.json());

// static images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/otp", otpRoutes);

// health check
app.get("/", (req, res) => {
  res.send("Smart Tourism API working");
});

// ✅ connect DB THEN start server
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
// // Make admin user (run once)
// const User = require("./models/User");

// const makeAdmin = async () => {
//   const email = "supratikmitra15@gmail.com"; // 👈 put your email

//   const user = await User.findOne({ email });

//   if (user) {
//     user.isAdmin = true;
//     await user.save();
//     console.log("You are now admin ✅");
//   } else {
//     console.log("User not found ❌");
//   }
// };

// makeAdmin();,