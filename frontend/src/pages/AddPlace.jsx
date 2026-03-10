import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Stack } from "@mui/material";
import { createPlace } from "../api/api";
import { useNavigate } from "react-router-dom";

const AddPlace = () => {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    location: "",
    ticketPrice: "",
    description: ""
  });

  const [image, setImage] = useState(null);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();

      fd.append("name", form.name);
      fd.append("location", form.location);
      fd.append("ticketPrice", form.ticketPrice);
      fd.append("description", form.description);

      if (image) fd.append("image", image);
      console.log(fd);
      await createPlace(fd);

      alert("Place added successfully");

      nav("/home");
    } catch (err) {
      alert("Error creating place");
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add Tourist Place
      </Typography>

      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Place Name"
            name="name"
            onChange={onChange}
            required
          />

          <TextField
            label="Location"
            name="location"
            onChange={onChange}
            required
          />

          <TextField
            label="Ticket Price"
            name="ticketPrice"
            type="number"
            onChange={onChange}
          />

          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            onChange={onChange}
            required
          />

          <Button variant="outlined" component="label">
            Upload Image
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>

          <Button type="submit" variant="contained">
            Add Place
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default AddPlace;