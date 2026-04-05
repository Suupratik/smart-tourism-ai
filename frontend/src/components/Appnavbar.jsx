import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Appnavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ GET USER + ADMIN
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.isAdmin;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Smart Tourism
        </Typography>

        <Box>
          {!token ? (
            <>
              <Button component={Link} to="/" color="inherit">
                Register
              </Button>

              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/home" color="inherit">
                Places
              </Button>

              {/* ✅ ADMIN ONLY */}
              {isAdmin && (
                <Button component={Link} to="/add" color="inherit">
                  Add Place
                </Button>
              )}

              <Button component={Link} to="/my-tickets" color="inherit">
                My Tickets
              </Button>

              {/* ✅ ADD THIS */}
              <Button component={Link} to="/chat-live" color="inherit">
                Live Chat
              </Button>

              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Appnavbar;