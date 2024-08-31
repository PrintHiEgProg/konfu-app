import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 } from "uuid"
import axios from "axios";
import io from "socket.io-client";
import "./App.css";

const socket = io("printhiegprog-conference-app-backend-b2bd.twc1.net");

const Conference = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [conferenceName, setConferenceName] = useState('');
  const [conferences, setConferences] = useState({});
  const [status, setStatus] = useState('')



  useEffect(() => {
    socket.on("conferences", (data) => {
      setConferences(data);
    });
    socket.on("new-conference", (data) => {
      setConferences((prevConferences) => ({
        ...prevConferences,
        [data.roomID]: data,
      }));
    });
  }, []);

  const handleJoinConference = (roomID) => {
    navigate(`/room/${roomID}`);
  };

  

  const handleCreateConference = () => {
    setShowModal(true);
  };

  const handleModalSubmit = () => {
    const roomID = v4();
    // Отправляем запрос на сервер для создания комнаты
    fetch("http://localhost:3001/create-conference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomID, conferenceName }),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate(`/room/${roomID}`);
      })
      .catch((error) => console.error(error));
  };


    const handleModalClose = () => {
        setShowModal(false);
    };
    
  return (
    <div className="Conference">
      <div className="header-box">
        <div className="header-text">Конференции</div>
      </div>
      <div className="conference-catalog">
        {Object.keys(conferences).map((roomID) => (
          <div key={roomID} className="conference-box">
            <img className="user-image" src={""} alt="userImage" />
            <div className="conference-name">{conferences[roomID].name}</div>
            <div className="conference-admin">
              Проводит: {conferences[roomID].admin}
            </div>
            <div
              className="join-btn"
              onClick={() => handleJoinConference(roomID)}
            >
              <div className="join-text">Войти</div>
            </div>
          </div>
        ))}
      </div>
      {!showModal && (
        <div className="create-conference-btn-helper">
          <div
            className="create-conference-btn"
            onClick={handleCreateConference}
          >
            <div className="create-conference-btn-text">Создать</div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-conference">
          <div className="modal-conference-content">
            <h2 className="title-modal">Новая конференция</h2>
            <br />
            <br />
            <br />
            <br />
            <br />
            <form onSubmit={handleModalSubmit}>
              <label className="label-for-form">Название</label>
              <br />
              <input
                className="input-for-form"
                type="text"
                value={conferenceName}
                onChange={(e) => setConferenceName(e.target.value)}
                placeholder="Название конференции"
              />
              {showModal && (
                <div className="create-conference-btn-helper">
                  <div
                    className="create-conference-btn"
                    onClick={handleModalSubmit}
                  >
                    <div className="create-conference-btn-text">Начать</div>
                  </div>
                </div>
              )}
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

export default Conference;
