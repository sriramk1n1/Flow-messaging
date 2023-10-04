const WebSocket = require('ws');
// import { Database } from 'better-sqlite3';
const PORT = 3000; // Change this to your desired port

const server = new WebSocket.Server({ port: PORT });

server.on('connection', (socket) => {
  console.log('A new client connected');
  // const db = new Database('src/lib/my.db');
  //   const query = `
  //       SELECT *
  //       FROM conversations
  //       WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)
  //       ORDER BY timestamp
  //   `;
  //   const q = db.prepare(query);
  //   const result = q.all(femail,email,email,femail);
  //   // console.log(result)
  //   return json(result);
  // Handle incoming messages from clients
  socket.on('message', (message) => {
    console.log(`Received: ${message}`);
    
    // You can send a response back to the client if needed
    // socket.send(`You sent: ${message}`);
  });

  // Handle the close event
  socket.on('close', () => {
    console.log('A client disconnected');
  });
});

console.log(`WebSocket server is running on ws://localhost:${PORT}`);
