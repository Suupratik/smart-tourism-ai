import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import api from "../api/api";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const res = await api.get("/payments/my-tickets");
      setTickets(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        My Tickets
      </Typography>

      {tickets.length === 0 && (
        <Typography>No tickets purchased yet.</Typography>
      )}

      {tickets.map((ticket) => (
        <Paper key={ticket._id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">
            Place ID: {ticket.placeId}
          </Typography>

          <Typography>
            Amount Paid: ₹{ticket.amount / 100}
          </Typography>

          <Typography>
            Status: {ticket.status}
          </Typography>
        </Paper>
      ))}
    </div>
  );
};

export default MyTickets;