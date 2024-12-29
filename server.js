const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
//const WebSocket = require('ws');
let ip = require('ip'); // to determine server ip

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
//const wss = new WebSocket.Server({ server });

// var lobby = require('./lobby');

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
    socket.data.id = hs.address + " " + hs.query.t;
  } else {
    console.log(hs);
    socket.data.id = 'unknown'
  }
  console.log('A user connected ' + socket.data.id);
  addNewPlayer({"id": socket.data.id})
  console.log(players)
  sendPlayers()

  //console.log(hs);

  socket.on('chatMessage', (message) => {
    console.log('***')
    console.log(playerName(socket.data.id));
    const msg = `${playerName(socket.data.id)} : ${message}`
    console.log(msg);
    // Broadcast the message to all connected clients
    io.emit('chatMessage', msg);
  });

  socket.on('usernameMessage', (username) => {
    setUsername(socket.data.id, username)
    const msg = `${socket.data.id} : ${username}`
    console.log(msg);
    // Broadcast the message to all connected clients
    io.emit("chatMessage", `player: ${socket.data.id} gonna be known as: ${username}`);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    setPlayerStatus(socket.data.id, "offline")
    console.log(players)
    sendPlayers()
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

//Lobby
const players = []

function addNewPlayer(player) { 
    if (!checkPlayerExist(player)){
        players.push(player)
    }
}

function checkPlayerExist(player) {
    players.forEach(element => {
        if (player.id == element.id) {
            return true
        }
    }) 
    return false
}

function setPlayerStatus(id, status) {
  players.forEach(element => {
    if(id == element.id) {
      element.status = status
    }
  })
}

function setUsername(id, username) {
  players.forEach(element => {
    if(id == element.id) {
      element.username = username
    }
  })
  sendPlayers()
}

function playerName(id) {
  let name = id
  players.forEach(element => {
    if(id == element.id) {
      let exists = Object.keys(element).includes("username");
      if (exists) {        
        name = element.username        
      }
      return
    }
  });
  return name
}

function sendPlayers() {
  io.emit("Players", JSON.stringify(players));
}
