import React, { useEffect, useState } from "react";
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
import AudioStream from "./AudioStream.js";
import socketIO from "socket.io-client";

const socket = socketIO.connect(
  "https://printhiegprog-conference-app-backend-b2bd.twc1.net"
);

function App() {
  
  const [notJoinApp, setNotJoinApp] = useState(true) 
  const [goRegistration, setGoRegistration] = useState(false)
  
  const [username, setUsername] = useState(() => {
    const savedUsername = localStorage.getItem("username");
    return savedUsername !== null ? savedUsername : "Неизвестный пользователь";
  });
  const [typeUser, setTypeUser] = useState(() => {
    const savedUsername = localStorage.getItem("typeUser");
    return savedUsername !== null ? savedUsername : false;
  });
  
  

  useEffect(() => {
    localStorage.setItem("username", username)
    localStorage.setItem("typeUser", typeUser)
  }, [username])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/room-audio/:roomId" element={<AudioStream />} />
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


