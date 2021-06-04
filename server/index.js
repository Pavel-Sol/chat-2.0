const express = require('express');
const server = require('http').createServer(express);

const socketio = require('socket.io');
const io = socketio(server);

const PORT = '3000';

server.listen(PORT, () => {
  console.log(`server works on ${PORT} port`);
});
