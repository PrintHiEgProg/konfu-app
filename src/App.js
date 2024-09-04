import React, { useEffect, useState, useRef } from "react";
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
import WebcamFeed from "./WebFeed.js";
import socketIO from "socket.io-client";

const socket = socketIO.connect(
  "https://printhiegprog-knofu-app-backend-46b9.twc1.net"
);

function App() {
  
  return (
    <div>
     <WebcamFeed />
    </div>
  );
}



export default App;



