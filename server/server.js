const express = require("express");
const app = express();
const http = require("http");
// const socketio = require("socket.io");
const { Server } = require("socket.io");
const cors = require("cors");
const PORT = 3000;

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    //later change to deployment origin
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

io.on("connection", socket => {
  console.log(`connection establish for websocket`);

  socket.on("join_room", data => {
    socket.join(data);
    console.log(`user with id: ${socket.id} joined room: ${data}`);
  });
  socket.on("send_message", data => {
    socket.to(data.room).emit("recieved_message", data);
  });
  socket.on("disconnect", () => {
    console.log(`user disconnected, ${socket.id}`);
  });

  //   socket.broadcast("recieved_message", data => {
  //     console.log(data);
  //   });
});

server.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
