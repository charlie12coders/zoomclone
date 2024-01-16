const express = require("express");
const bodyParser=require('body-parser');
require('dotenv').config({path:__dirname+'/config/AppConfig.env'})
const { Server } = require("socket.io");
const io = new Server({
  cors:true
});
const app = express();
app.use(bodyParser.json())
const emailToSocketMapping=new Map();
io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    console.log(`user is joining`);
    const { roomId, emailId } = data;
    console.log(`User ${emailId} join the room of ${roomId}`);
    emailToSocketMapping.set(emailId,socket.id);
    socket.join(roomId);
    socket.emit('joined-room',{roomId})
    socket.broadcast.to(roomId).emit("user-joined", { emailId });
  });
});
app.listen(process.env.Port, () => {
  console.log(`Server is listining on ${process.env.Port}`);
});
io.listen(process.env.ServerPort);
