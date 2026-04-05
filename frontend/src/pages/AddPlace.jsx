import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Typography, Stack } from "@mui/material";
import { createPlace } from "../api/api";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const AddPlace = () => {
  const nav = useNavigate();
  const { id } = useParams(); // ✅ detect edit mode

  const [form, setForm] = useState({
    name: "",
    location: "",
    ticketPrice: "",
    description: ""
  });

  const [image, setImage] = useState(null);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ FETCH PLACE FOR EDIT
  useEffect(() => {
    if (id) {
      api.get(`/places/${id}`).then((res) => {
        setForm({
          name: res.data.name || "",
          location: res.data.location || "",
          ticketPrice: res.data.ticketPrice || "",
          description: res.data.description || ""
        });
      });
    }
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();

      fd.append("name", form.name);
      fd.append("location", form.location);
      fd.append("ticketPrice", form.ticketPrice);
      fd.append("description", form.description);

      if (image) fd.append("image", image);

      if (id) {
        // ✅ UPDATE
        await api.put(`/places/${id}`, fd);
        alert("Place updated successfully");
      } else {
        // ✅ CREATE
        await createPlace(fd);
        alert("Place added successfully");
      }

      nav("/home");

    } catch (err) {
      alert("Error saving place");
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {id ? "Edit Tourist Place" : "Add Tourist Place"}
      </Typography>

      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Place Name"
            name="name"
            value={form.name}
            onChange={onChange}
            required
          />

          <TextField
            label="Location"
            name="location"
            value={form.location}
            onChange={onChange}
            required
          />

          <TextField
            label="Ticket Price"
            name="ticketPrice"
            type="number"
            value={form.ticketPrice}
            onChange={onChange}
          />

          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            value={form.description}
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
            {id ? "Update Place" : "Add Place"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default AddPlace;