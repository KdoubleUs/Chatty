import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(" ");

  const sendMsg = () => {
    socket.emit();
  };

  const userOnChange = e => {
    setUsername(e.target.value);
  };
  const roomOnChange = e => {
    setRoom(e.target.value);
  };
  return (
    <div className="application">
      <h3>Chatroom</h3>
      <input type="text" placeholder="User's name" />
      <input type="text" placeholder="Room ID " />
    </div>
  );
}

export default App;
