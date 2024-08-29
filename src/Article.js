import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Article = () => {
  

  return (
    <div className="Article">
      <div className="header-box">
        <div className="header-text">Статьи</div>
      </div>
      <div className="conference-box">
        <img
          className="article-image"
          src={
            "https://raw.githubusercontent.com/PrintHiEgProg/printhiegprog.github.io/main/education-platform/50.%20ovz%20geogr.webp"
          }
          alt="ArticleImage"
        />
        <div className="conference-name">География</div>
        <div className="conference-admin">Загадочные места планеты Земля</div>
      </div>
      <div className="conference-box">
        <img
          className="article-image"
          src={
            "https://raw.githubusercontent.com/PrintHiEgProg/printhiegprog.github.io/main/education-platform/1997247.webp"
          }
          alt="ArticleImage"
        />
        <div className="conference-name">Биология</div>
        <div className="conference-admin">Фотосинтез</div>
      </div>
    </div>
  );
};

export default Article;
