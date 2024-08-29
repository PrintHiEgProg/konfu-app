import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:3001"); 

const Room = () => {

    const { roomID } = useParams();
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    
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


    const GoToBack = () => {
        navigate("/")
    }

    const handleModalChat = () => {
      setShowModal(true);
    };

    const handleModalClose = () => {
      setShowModal(false);
    };
    
    
  return (
    <div className="Room">
      <div className="header-box">
        <div className="header-text">Конференция</div>
      </div>
      <div>{!showModal && <button onClick={GoToBack}>Выйти</button>}</div>
      {!showModal && (
        <div className="chat-box" onClick={handleModalChat}>
          <div className="chat-icon"></div>
        </div>
      )}
      {showModal && (
        <div>
          <div>
            <h2 className="title-modal">Chat Room</h2>
            <div>
              {messages.map((msg, index) => (
                <div key={index}>
                  <div className="message-container"></div>
                  <strong>{msg.user}: </strong>
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
            <div className="modal-close" onClick={handleModalClose}>
              ×
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
