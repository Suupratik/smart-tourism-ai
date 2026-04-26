import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Appnavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.isAdmin;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      <Toolbar>

        {/* LOGO / TITLE */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              letterSpacing: "1px"
            }}
          >
            Smart Tourism
          </Typography>
        </motion.div>

        <Box sx={{ ml: "auto" }}>
          {!token ? (
            <>
              <motion.div whileHover={{ scale: 1.1 }} style={{ display: "inline-block" }}>
                <Button component={Link} to="/" color="inherit">
                  Register
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} style={{ display: "inline-block" }}>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.1 }} style={{ display: "inline-block" }}>
                <Button component={Link} to="/home" color="inherit">
                  Places
                </Button>
              </motion.div>

              {isAdmin && (
                <motion.div whileHover={{ scale: 1.1 }} style={{ display: "inline-block" }}>
                  <Button component={Link} to="/add" color="inherit">
                    Add Place
                  </Button>
                </motion.div>
              )}

              <motion.div whileHover={{ scale: 1.1 }} style={{ display: "inline-block" }}>
                <Button component={Link} to="/my-tickets" color="inherit">
                  My Tickets
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} style={{ display: "inline-block" }}>
                <Button component={Link} to="/chat-live" color="inherit">
                  Live Chat
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} style={{ display: "inline-block" }}>
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </motion.div>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Appnavbar;