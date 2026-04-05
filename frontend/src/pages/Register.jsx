import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import api from "../api/api";

const Register = () => {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ SEND OTP
  const sendOTP = async () => {
    try {
      await api.post("/otp/send", { email: form.email });
      alert("OTP sent to your email");
      setOtpSent(true);
    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  // ✅ VERIFY OTP
  const verifyOTP = async () => {
    try {
      const res = await api.post("/otp/verify", {
        email: form.email,
        otp
      });

      if (res.data.success) {
        alert("OTP Verified ✅");
        setVerified(true);
      }
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!verified) {
      alert("Please verify OTP first");
      return;
    }

    try {
      await registerUser(form);
      alert("Registration successful");
      nav("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Register
      </Typography>

      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            onChange={onChange}
            required
          />

          <TextField
            label="Email"
            name="email"
            onChange={onChange}
            required
          />

          {/* ✅ SEND OTP BUTTON */}
          <Button variant="outlined" onClick={sendOTP}>
            Send OTP
          </Button>

          {otpSent && (
            <>
              <TextField
                label="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <Button variant="contained" onClick={verifyOTP}>
                Verify OTP
              </Button>
            </>
          )}

          <TextField
            label="Password"
            name="password"
            type="password"
            onChange={onChange}
            required
          />

          <Button type="submit" variant="contained">
            Register
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default Register;