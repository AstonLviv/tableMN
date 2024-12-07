const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
//const WebSocket = require('ws');
let ip = require('ip'); // to determine server ip

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
//const wss = new WebSocket.Server({ server });

const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

let appInstance = server.listen(PORT, () => {
  // console.log(`Server is running and listening on port ${PORT}`);
  // console.log(`'Server listening at: ${appInstance.address().address}`)
  // console.log('opened server on', server.address().address);
  //console.log('Server:' + httpServer.address().address);
  //console.log(app.request.ip);
  console.log(`${ip.address()}:${PORT}`);
});

io.on('connection', (socket) => {
  let hs = socket.handshake;
  if (hs.query.t) {
    socket.data.username = hs.address + " " + hs.query.t;
  } else {
    console.log(hs);
  }
  console.log('A user connected ' + socket.data.username);
  
  //console.log(hs);

  socket.on('chatMessage', (message) => {
    const msg = `${socket.data.username} : ${message}`
    console.log(msg);
    // Broadcast the message to all connected clients
    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// wss.on('connection', (ws) => {
//   ws.on('message', (message) => {
//       // Broadcast the message to all connected clients
//       wss.clients.forEach((client) => {
//           if (client !== ws && client.readyState === WebSocket.OPEN) {
//               client.send(message);
//           }
//       });
//   });
  
//   ws.send('Welcome to the chat!');
// });

