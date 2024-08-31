import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io(
  "http://printhiegprog-conference-app-backend-b2bd.twc1.net"
);

const AudioStream = () => {
  const { roomID } = useParams();
  const audioRef = useRef(null);
  const [typeUser, setTypeUser] = useState(false); // false - слушатель, true - передатчик

  useEffect(() => {
    socket.emit("joinVoiceRoom", { roomID, typeUser });

    socket.on("audio", (data) => {
      const audioBlob = new Blob([data], { type: "audio/webm" });
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    });

    return () => {
      socket.off("audio");
    };
  }, [roomID, typeUser]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        socket.emit("audio", event.data);
      }
    };

    mediaRecorder.start(100); // отправляем данные каждые 100 мс

    // Остановить запись после 10 секунд
    setTimeout(() => {
      mediaRecorder.stop();
    }, 10000);
  };

  return (
    <div>
      <h2>Room ID: {roomID}</h2>
      <div>
        <label>
          <input
            type="radio"
            value="true"
            checked={typeUser === true}
            onChange={() => setTypeUser(true)}
          />
          Передатчик
        </label>
        <label>
          <input
            type="radio"
            value="false"
            checked={typeUser === false}
            onChange={() => setTypeUser(false)}
          />
          Слушатель
        </label>
      </div>
      {typeUser && <button onClick={startRecording}>Start Recording</button>}
      <audio ref={audioRef} controls></audio>
    </div>
  );
};

export default AudioStream;
