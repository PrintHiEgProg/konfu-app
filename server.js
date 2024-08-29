const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

const rooms = {};

// Обработка подключения клиента
io.on("connection", (socket) => {
  console.log("New client connected");

  // Присоединение к комнате
  socket.on("joinRoom", ({ roomID }) => {
    socket.join(roomID);
    console.log(`User joined room: ${roomID}`);

    // Отправка сообщения о новом пользователе
    socket
      .to(roomID)
      .emit("message", { user: "admin", text: `${socket.id} has joined!` });
  });

  // Обработка сообщений
  socket.on("sendMessage", ({ roomID, message }) => {
    io.to(roomID).emit("message", { user: socket.id, text: message });
  });

  // Обработка отключения
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Запуск сервера
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
