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
import socketIO from "socket.io-client";

const socket = socketIO.connect(
  "https://printhiegprog-knofu-app-backend-46b9.twc1.net"
);

function App() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [localStream, setLocalStream] = useState(null);

  const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    socket.on("offer", async (offer) => {
      if (!peerConnection) {
        const pc = new RTCPeerConnection(configuration);
        setPeerConnection(pc);
        localStream
          .getTracks()
          .forEach((track) => pc.addTrack(track, localStream));

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", event.candidate);
          }
        };

        pc.ontrack = (event) => {
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("answer", answer);
      }
    });

    socket.on("answer", (answer) => {
      peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("ice-candidate", (candidate) => {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [peerConnection, localStream]);

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);
    localVideoRef.current.srcObject = stream;

    const pc = new RTCPeerConnection(configuration);
    setPeerConnection(pc);

    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", event.candidate);
      }
    };

    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit("offer", offer);
  };

  return (
    <div>
      <h2>WebRTC Video Chat</h2>
      <video ref={localVideoRef} autoPlay muted style={{ width: "300px" }} />
      <video ref={remoteVideoRef} autoPlay style={{ width: "300px" }} />
      <button onClick={startCall}>Start Call</button>
    </div>
  );
}



export default App;



