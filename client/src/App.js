import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./Chat";
const socket = io.connect("http://localhost:3000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(" ");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room != "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const userOnChange = e => {
    setUsername(e.target.value);
  };
  const roomOnChange = e => {
    setRoom(e.target.value);
  };
  return (
    <div className="application">
      {!showChat ? (
        <div className="defaultChat">
          <h3>Chatroom</h3>
          <input
            type="text"
            placeholder="User's name"
            onChange={userOnChange}
          />
          <input type="text" placeholder="Room ID " onChange={roomOnChange} />
          <button onClick={joinRoom}> Join Room </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
