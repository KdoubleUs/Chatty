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
      setMessagelist(list => [...list, messageData]);
    }
  };
  const messageOnChange = e => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    socket.on("receive_message", data => {
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
          return (
            <div>
              <div className="message-content">
                <p>{msg.message}</p>
              </div>
              <div className="message-meta">
                <p id="time">{msg.time}</p>
                <p id="author">{msg.author}</p>
              </div>
            </div>
          );
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
