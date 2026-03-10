import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import Appnavbar from "./components/Appnavbar";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddPlace from "./pages/AddPlace";
import PlaceDetails from "./pages/PlaceDetails";

import PrivateRoute from "./utils/PrivateRoute";
import MyTickets from "./pages/MyTickets";
const App = () => {
  return (
    <BrowserRouter>
      <Appnavbar />

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/add" element={<AddPlace />} />
            <Route path="/place/:id" element={<PlaceDetails />} />
            <Route path="/my-tickets" element={<MyTickets />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;