const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Handle incoming WebSocket connections
io.on('connection', (socket) => {
  console.log('WebSocket connected:', socket.id);

  // Join a conversation room
  socket.on('joinRoom', (conversationId) => {
    socket.join(conversationId);
  });

  // Handle incoming user messages
  socket.on('userMessage', (data) => {
    const { conversationId, message } = data;

    // Process the user message and generate a bot response
    const botResponse = generateBotResponse(message);

    // Emit the bot response as a 'botMessage' event to the conversation room
    io.to(conversationId).emit('botMessage', { text: botResponse });
  });

  // Handle disconnection and cleanup if needed
  socket.on('disconnect', () => {
    console.log('WebSocket disconnected:', socket.id);
    // Perform any necessary cleanup
  });
});

// Generate a bot response based on the user message
function generateBotResponse(userMessage) {
  // Process the user message and generate a bot response
  // Replace this with your own logic to generate the bot response
  return 'This is a bot response';
}

// Start the server
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
