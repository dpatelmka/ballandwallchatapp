const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle joining a room
    socket.on('join_room', (room) => {
        socket.join(room);
    });

    // Handle sending a message
    socket.on('send_message', (data) => {
        // Send to everyone in that specific room
        io.to(data.room).emit('receive_message', data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
