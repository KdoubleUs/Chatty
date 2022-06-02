import React, { useState, useEffect } from "react";

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessagelist] = useState([]);
  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: username,
        message: message,
        timeStamp:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessagelist(msg => [...msg, messageData]);
    }
  };
  const messageOnChange = e => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    socket.on("recieved_message", data => {
      setMessagelist(list => [...list, data]);
    });
  }, [socket]);
  return (
    <div>
      <div className="chat-header">
        <p> Live Chat </p>
      </div>
      <div className="chat-body">
        {messageList.map(msg => {
          return <h1>{msg.message}</h1>;
        })}
      </div>
      <div className="chat-footer">
        <input type="text" onChange={messageOnChange} />
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  );
}

export default Chat;
