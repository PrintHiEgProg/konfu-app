import React, { useEffect, useState, useSyncExternalStore } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";
import './App.css';
import Article from "./Article.js";
import Conference from "./Conference.js"
import Navbar from "./Navbar.js";
import Registration from "./Registration.js";
import Login from "./Login.js";
import Notes from "./Notes.js"
import Profile from "./Profile.js"
import Room from "./Room.js"
import NotFound404 from "./NotFound404.js"
import Chat from "./Chat.js";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:3001");

function App() {
  
  const [notJoinApp, setNotJoinApp] = useState(true) 
  const [goRegistration, setGoRegistration] = useState(false)
  
  const [username, setUsername] = useState(() => {
    const savedUsername = localStorage.getItem("username");
    return savedUsername !== null ? savedUsername : "Неизвестный пользователь";
  });
  
  useEffect(() => {
    localStorage.setItem("username", username)
  }, [username])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/chat/:roomID" element={<Chat />} />
          <Route path="/room/:roomID" element={<Room />} />
          <Route exact path="/" element={<Conference />} />
          <Route path="/articles" element={<Article />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
        <AppContent />
      </Router>
    </div>
  );
}

export default App;

function AppContent() {
  const location = useLocation();
  return <div>{!location.pathname.startsWith("/room/") && <Navbar />}</div>;
}


