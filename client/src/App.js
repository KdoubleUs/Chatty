import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  return <h1>hi</h1>;
}

export default App;
