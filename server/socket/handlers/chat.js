import { getRoomId } from "../../services/roomService.js";

export const handleChat = (socket, io, users) => {
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
};