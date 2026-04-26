import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import { AnimatePresence } from "framer-motion";

import Appnavbar from "./components/Appnavbar";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddPlace from "./pages/AddPlace";
import PlaceDetails from "./pages/PlaceDetails";
import MyTickets from "./pages/MyTickets";
import RealtimeChat from "./pages/RealtimeChat";

import PrivateRoute from "./utils/PrivateRoute";

// 👇 Separate component for animation support
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        {/* Public */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Private */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<AddPlace />} />
          <Route path="/place/:id" element={<PlaceDetails />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/chat-live" element={<RealtimeChat />} />
        </Route>

      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Appnavbar />

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <AnimatedRoutes />
      </Container>
    </BrowserRouter>
  );
};

export default App;