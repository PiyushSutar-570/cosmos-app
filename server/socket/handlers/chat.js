import { getRoomId } from "../../services/roomService.js";

export const handleChat = (socket, io, users) => {
  // Join room when proximity triggers (frontend or server)
  socket.on("joinRoom", ({ targetId }) => {
    if (!users[targetId]) return;

    const room = getRoomId(socket.id, targetId);

    socket.join(room);

    io.to(room).emit("roomJoined", {
      room,
      users: [socket.id, targetId],
    });
  });

  // Send message
  socket.on("sendMessage", ({ targetId, message }) => {
    if (!users[targetId]) return;

    const room = getRoomId(socket.id, targetId);

    const payload = {
      room,
      from: socket.id,
      message,
      timestamp: new Date(),
    };

    io.to(room).emit("receiveMessage", payload);
  });

  // Leave room
  socket.on("leaveRoom", ({ targetId }) => {
    const room = getRoomId(socket.id, targetId);

    socket.leave(room);

    io.to(room).emit("roomLeft", {
      room,
      user: socket.id,
    });
  });
};