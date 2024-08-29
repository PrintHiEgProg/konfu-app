import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 } from "uuid"
import axios from "axios";
import "./App.css";

const Conference = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [conferenceName, setConferenceName] = useState('');
  const [conferences, setConferences] = useState([]);
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetchConferences();
  }, []);

  useEffect(() => {
    localStorage.setItem("conferenceName", conferenceName);
  }, [conferenceName]);

  const fetchConferences = async () => {
    try {
      const response = await axios.get("/api/conferences");
      setConferences(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateConference = () => {
    setShowModal(true);
  };

  const handleModalSubmit = async (e) => {
    const roomID = v4();
    navigate(`/room/${roomID}`)
    localStorage.setItem("status", status)
    e.preventDefault();
    try {
      const response = await axios.post("/api/conferences", {
        name: conferenceName,
        //admin: username, // replace with actual admin name
      });
      setConferences([...conferences, response.data]);
      setShowModal(false);
      setConferenceName("");
    } catch (error) {
      console.error(error);
    }
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
        {conferences.map((conference, index) => (
          <div key={index} className="conference-box">
            <img className="user-image" src={""} alt="userImage" />
            <div className="conference-name">{conference.name}</div>
            <div className="conference-admin">Проводит: {conference.admin}</div>
            <div className="join-btn" onClick={""}>
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
