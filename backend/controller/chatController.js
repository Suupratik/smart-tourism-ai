const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const chatWithAI = async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message required"
      });
    }

    const messages = [
      {
        role: "system",
        content:
          "You are an AI travel guide for a Smart Tourism website. Help users with tourist places, travel tips, and suggestions in simple English."
      },
      ...history,
      {
        role: "user",
        content: message
      }
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.7,
      max_tokens: 500
    });

    const reply =
      completion?.choices?.[0]?.message?.content || "No response";

    res.json({
      success: true,
      reply
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Chat failed"
    });
  }
};

module.exports = { chatWithAI };