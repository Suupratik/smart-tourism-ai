import React, { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { sendChatMessage } from "../api/api";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  const send = async () => {
    if (!msg) return;

    try {
      const res = await sendChatMessage({
        message: msg,
      });

      setReply(res.data.reply);
      setMsg("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(!open)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20
        }}
      >
        AI Guide
      </Button>

      {open && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: 300,
            p: 2
          }}
        >
          <Typography variant="h6">AI Tourism Guide</Typography>

          <TextField
            fullWidth
            size="small"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Ask about travel..."
            sx={{ mt: 1 }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
            onClick={send}
          >
            Send
          </Button>

          {reply && (
            <Typography sx={{ mt: 2 }}>
              {reply}
            </Typography>
          )}
        </Paper>
      )}
    </>
  );
};

export default Chatbot;