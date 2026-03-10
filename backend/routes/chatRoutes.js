const express = require("express");
const router = express.Router();

const { chatWithAI } = require("../controller/chatController");

router.post("/", chatWithAI);

module.exports = router;