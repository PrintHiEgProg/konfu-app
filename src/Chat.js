// src/Chat.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("https://printhiegprog-conference-app-backend-b2bd.twc1.net"); 

const Chat = () => {
  const { roomID } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", { roomID });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off();
    };
  }, [roomID]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", { roomID, message });
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chat Room: {roomID}</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <div className="message-container"></div><strong>{msg.user}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
