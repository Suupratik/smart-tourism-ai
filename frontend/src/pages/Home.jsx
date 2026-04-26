import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  Button,
  Container,
  TextField
} from "@mui/material";
import { getPlaces } from "../api/api";
import api from "../api/api";
import { Link } from "react-router-dom";
import Chatbot from "../components/Chatbot";
import { motion } from "framer-motion";

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredPlaces = places.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

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
      
      {/* 🔥 TITLE */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: 4,
            fontWeight: "bold",
            textAlign: "center",
            letterSpacing: "1px"
          }}
        >
          Smart Tourism Explorer
        </Typography>
      </motion.div>

      {/* 🔍 SEARCH BAR (UPGRADED) */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search places..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 4,
          background: "rgba(255,255,255,0.1)",
          borderRadius: "12px",
          input: { color: "white" }
        }}
      />

      <Grid container spacing={3}>
        {filteredPlaces.map((p, index) => (
          <Grid item xs={12} md={4} key={p._id}>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.04 }}
            >
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
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
                      borderRadius: "12px",
                      marginBottom: "10px"
                    }}
                  />
                )}

                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {p.name}
                </Typography>

                <Typography sx={{ mb: 2, color: "#ccc" }}>
                  {p.location}
                </Typography>

                <motion.div whileTap={{ scale: 0.9 }}>
                  <Button
                    component={Link}
                    to={`/place/${p._id}`}
                    size="small"
                    variant="outlined"
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>
                </motion.div>

                <motion.div whileTap={{ scale: 0.9 }}>
                  <Button
                    size="small"
                    color="error"
                    variant="contained"
                    onClick={() => deletePlace(p._id)}
                  >
                    Delete
                  </Button>
                </motion.div>
              </Paper>
            </motion.div>

          </Grid>
        ))}
      </Grid>

      <Chatbot />
    </Container>
  );
};

export default Home;