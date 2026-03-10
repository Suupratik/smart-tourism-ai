import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

const Login = () => {
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);

      nav("/home");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Login
      </Typography>

      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            name="email"
            onChange={onChange}
            required
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            onChange={onChange}
            required
          />

          <Button type="submit" variant="contained">
            Login
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default Login;