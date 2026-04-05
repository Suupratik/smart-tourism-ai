const nodemailer = require("nodemailer");

let otpStore = {}; // simple in-memory store

// send OTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(1000 + Math.random() * 9000);

    otpStore[email] = otp;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`
    });

    res.json({ message: "OTP sent to email" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// verify OTP
exports.verifyOTP = (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] == otp) {
    delete otpStore[email];
    return res.json({ success: true, message: "OTP verified" });
  }

  res.status(400).json({ success: false, message: "Invalid OTP" });
};