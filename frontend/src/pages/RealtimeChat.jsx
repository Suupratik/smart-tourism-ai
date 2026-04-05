import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { TextField, Button, Paper, Typography } from "@mui/material";

const socket = io("http://localhost:5600");

const RealtimeChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

 useEffect(() => {
  const handleMessage = (data) => {
    setMessages((prev) => [...prev, data]);
  };

  socket.on("receive_message", handleMessage);

  return () => {
    socket.off("receive_message", handleMessage); // ✅ cleanup
  };
}, []);

  const sendMessage = () => {
    if (message.trim() === "") return;

    socket.emit("send_message", message);
    setMessage("");
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5">Real-Time Chat</Typography>

      <div style={{ marginTop: 20 }}>
        {messages.map((msg, i) => (
          <Typography key={i}>{msg}</Typography>
        ))}
      </div>

      <TextField
        fullWidth
        sx={{ mt: 2 }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
      />

      <Button sx={{ mt: 2 }} variant="contained" onClick={sendMessage}>
        Send
      </Button>
    </Paper>
  );
};

export default RealtimeChat;