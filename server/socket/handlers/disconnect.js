import { removeUser } from "../../services/userService.js";

export const handleDisconnect = (socket, io, users) => {
  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);

    // ✅ CLEAN CONNECTIONS
    Object.values(users).forEach((user) => {
      user.connections?.delete(socket.id);
    });

    removeUser(users, socket.id);

    io.emit("userLeft", socket.id);
  });
};