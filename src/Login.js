import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Login = ({ joinApp, setJoinApp }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { mail, password };
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // redirect to dashboard page
          //куда-то перейти, хотя похуй тут будет просто переменная;
        } else {
          setError(data.error);
        }
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="Conference">
      <div className="header-box">
        <div className="header-text">Вход</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="reg-login-container">
          <label className="label-for-form">Почта</label>
          <br />
          <input
            className="input-for-form"
            placeholder="Почта"
            type="text"
            value={mail}
            onChange={(event) => setMail(event.target.value)}
          />
          <br />
          <br />
          <label className="label-for-form">Пароль</label>
          <br />
          <input
            className="input-for-form"
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
