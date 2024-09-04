import React, { useState, useEffect, useRef } from "react";
import socketIO from "socket.io-client";

function WebcamFeed() {
  const [stream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);

    
    const socket = socketIO.connect(
      "https://printhiegprog-knofu-app-backend-46b9.twc1.net"
    );
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });
  }, []);

  useEffect(() => {
    // Создаем peer connection
    const pc = new RTCPeerConnection();

    // Добавляем локальный поток к peer connection
    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    // Создаем offer и отправляем его на сервер
    pc.createOffer()
      .then((offer) => {
        return pc.setLocalDescription(
          new RTCSessionDescription({ type: "offer", sdp: offer })
        );
      })
      .then(() => {
        // Отправляем offer на сервер
        fetch("https://printhiegprog-knofu-app-backend-46b9.twc1.net/offer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pc.localDescription),
        });
      });

    // Обрабатываем ответ от сервера
    fetch("/answer")
      .then((response) => {
        return response.json();
      })
      .then((answer) => {
        // Устанавливаем ответ от сервера
        pc.setRemoteDescription(
          new RTCSessionDescription({ type: "answer", sdp: answer })
        );
      });

    // Обрабатываем добавление удаленного потока
    pc.onaddstream = (event) => {
      setRemoteStream(event.stream);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.stream;
      }
    };
  }, [stream]);

    const TypeUserAdmin = () => {
        setRemoteStream(false)
        setStream(true)
    }

    const TypeUserMember = () => {
        setStream(false)
        setRemoteStream(true)
    }


  return (
      <div>
          <button onClick={TypeUserAdmin}>Стать админом</button>
          <button onClick={TypeUserMember}>Стать слушателем</button>
      {stream && (
        <video ref={videoRef} width="640" height="480" autoPlay playsInline />
      )}
      {remoteStream && (
        <video
          ref={remoteVideoRef}
          width="640"
          height="480"
          autoPlay
          playsInline
        />
      )}
    </div>
  );
}

export default WebcamFeed;
