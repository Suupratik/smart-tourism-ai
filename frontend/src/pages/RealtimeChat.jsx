import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { TextField, Button, Paper, Typography } from "@mui/material";

// ✅ use same backend URL everywhere
const socket = io("https://smart-tourism-ai.onrender.com", {
  transports: ["websocket"], // more stable in production
  withCredentials: true
});

const RealtimeChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  // optional: identify user
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.name || "Guest";

  useEffect(() => {
    // ✅ connection status
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    // ✅ receive messages
    const handleMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const msgData = {
      user: username,
      text: message
    };

    socket.emit("send_message", msgData);

    setMessage("");
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5">
        Real-Time Chat {connected ? "🟢" : "🔴"}
      </Typography>

      <div style={{ marginTop: 20, maxHeight: 300, overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <Typography key={i}>
            <strong>{msg.user}:</strong> {msg.text}
          </Typography>
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