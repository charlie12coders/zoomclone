const express = require("express");
const { Server } = require("socket.io");
const io = new Server();
const app = express();
const emailToSocketMapping=new Map();
io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    console.log(`user is joining`);
    const { roomId, emailId } = data;
    emailToSocketMapping.set(emailId,socket.id);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-joined", { emailId });
  });
});
app.listen(process.env.Port, () => {
  console.log(`Server is listining on ${process.env.Port}`);
});
io.listen(process.env.ServerPort);
