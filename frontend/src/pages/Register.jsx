import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

const Register = () => {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

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