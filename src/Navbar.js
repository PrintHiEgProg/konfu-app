import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Navbar = () => {

    const navigate = useNavigate()
    
  const handleConferenceClick = () => {
    
    navigate("/");
  };

  const handleNotesClick = () => {
    
    navigate("/notes");
  };

  const handleArticlesClick = () => {
    
    navigate("/articles");
  };

  const handleProfileClick = () => {
    
    navigate("/profile");
  };


  return (
    <div className="Navbar">
      <div className="nav-bar-btn-box">
        <div className="icon-container" onClick={handleConferenceClick}>
          <button className="icon conferences"></button>
          <p className="icon-description">Конференции</p>
        </div>
        <div className="icon-container" onClick={handleArticlesClick}>
          <button className="icon articles"></button>
          <p className="icon-description">Статьи</p>
        </div>
        <div className="icon-container" onClick={handleNotesClick}>
          <button className="icon notes"></button>
          <p className="icon-description">Заметки</p>
        </div>
        <div className="icon-container" onClick={handleProfileClick}>
          <button className="icon profile"></button>
          <p className="icon-description">Профиль</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
