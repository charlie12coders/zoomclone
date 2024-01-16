import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { useSocket } from "../providers/Socket";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate=useNavigate();
  const { socket } = useSocket();
  const [emailId, SetEmailID] = useState();
  const [roomId, SetRoomId] = useState();
  const handleRoomJoined = ({ roomId }) => {
    navigate(`/room/${roomId}`)
  };
  useEffect(() => {
    socket.on("joined-room", handleRoomJoined);
  }, [socket]);
  const handleJoinRoom = () => {
    console.log(emailId, roomId);
    socket.emit("join-room", { emailId, roomId });
  };
  //socket.emit("join-room", { roomId: "1", emailId: "chintan@mailiantor.com" });
  return (
    <div className="homepage-container">
      <div className="input-container">
        <input
          value={emailId}
          onChange={(e) => SetEmailID(e.target.value)}
          type="email"
          placeholder="Enter your name here"
          name=""
          id=""
        />
        <input
          value={roomId}
          onChange={(e) => SetRoomId(e.target.value)}
          type="text"
          placeholder="Enter Room Code"
          name=""
          id=""
        />
        <button onClick={handleJoinRoom}>Enter Room</button>
      </div>
    </div>
  );
};

export default HomePage;
