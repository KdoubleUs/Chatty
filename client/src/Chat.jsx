import React, { useState } from "react";

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");
  return (
    <div>
      <div className="chat-header">
        <p> Live Chat </p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input type="text" />
        <button>send</button>
      </div>
    </div>
  );
}

export default Chat;
