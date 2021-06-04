const express = require('express');
const server = require('http').createServer(express);

const socketio = require('socket.io');
const io = socketio(server);

io.on('connection', (socket) => {
  console.log(`connected user ${socket.id}`);

  let user = null;

  socket.on('join', ({ name, room }) => {
    user = { id: socket.id, name, room };

    socket.join(room);
  });

  socket.on('sendMessage', ({ name, message }) => {
    io.sockets.in(user.room).emit('AddNewMessage', { name, message });
  });
});

const PORT = '3000';

server.listen(PORT, () => {
  console.log(`server works on ${PORT} port`);
});
