const express = require('express');
const server = require('http').createServer(express);

const socketio = require('socket.io');
const io = socketio(server);

io.on('connection', (socket) => {
  console.log(`connected user ${socket.id}`);

  socket.on('join', ({ name, room }) => {
    console.log(`name ${name} , room ${room}`);
    socket.join(room);
  });
});

const PORT = '3000';

server.listen(PORT, () => {
  console.log(`server works on ${PORT} port`);
});
