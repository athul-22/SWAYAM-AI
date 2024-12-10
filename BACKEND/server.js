// server.js
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const MAX_TOKENS = 16000; // Set your max token limit
const conversationHistory = []; // Store conversation history

// Function to estimate token count (simplified version)
const estimateTokens = (text) => {
  // Rough token estimation, OpenAI uses a more accurate method
  return text.split(' ').length;
};

// Function to trim conversation history based on token count
const trimConversationHistory = () => {
  let totalTokens = conversationHistory.reduce((acc, msg) => acc + estimateTokens(msg.content), 0);

  // Trim conversation history if the total tokens exceed the limit
  while (totalTokens > MAX_TOKENS && conversationHistory.length > 1) {
    // Remove the oldest message
    conversationHistory.shift();
    totalTokens = conversationHistory.reduce((acc, msg) => acc + estimateTokens(msg.content), 0);
  }
};

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Add user message to history
    conversationHistory.push({
      role: 'user',
      content: message
    });

    // Trim conversation history to avoid exceeding token limits
    trimConversationHistory();

    // Get response from OpenAI
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...conversationHistory
      ],
      model: 'gpt-3.5-turbo',
    });

    const aiResponse = completion.choices[0].message.content;

    // Add AI response to history
    conversationHistory.push({
      role: 'assistant',
      content: aiResponse
    });

    res.json({ message: aiResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


// Voice transcription endpoint
app.post('/api/transcribe', async (req, res) => {
  try {
    const { audioFile } = req.body;
    
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
    });

    res.json({ text: transcription.text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to transcribe audio' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});