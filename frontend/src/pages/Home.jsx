import React, { useEffect, useState } from "react";
import { Typography, Grid, Paper, Button, Container } from "@mui/material";
import { getPlaces } from "../api/api";
import api from "../api/api";
import { Link } from "react-router-dom";
import Chatbot from "../components/Chatbot";

const Home = () => {
  const [places, setPlaces] = useState([]);

  const fetchPlaces = async () => {
    try {
      const res = await getPlaces();
      setPlaces(res.data.places || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const deletePlace = async (id) => {
    try {

      if (!window.confirm("Delete this place?")) return;

      await api.delete(`/places/${id}`);

      alert("Place deleted");

      fetchPlaces();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}
      >
        🌍 Tourist Places
      </Typography>

      <Grid container spacing={3}>
        {places.map((p) => (
          <Grid item xs={12} md={4} key={p._id}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                overflow: "hidden",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 4
                }
              }}
            >
              {p.image && (
                <img
                  src={`http://localhost:5600${p.image}`}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "10px"
                  }}
                />
              )}

              <Typography variant="h6">{p.name}</Typography>

              <Typography sx={{ mb: 2, color: "gray" }}>
                {p.location}
              </Typography>

              <Button
                component={Link}
                to={`/place/${p._id}`}
                size="small"
                variant="outlined"
                sx={{ mr: 1 }}
              >
                View Details
              </Button>

              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={() => deletePlace(p._id)}
              >
                Delete
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Chatbot />
    </Container>
  );
};

export default Home;