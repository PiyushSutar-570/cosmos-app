import { updateUser } from "../../services/userService.js";

export const handleMove = (socket, io, users) => {
  socket.on("move", ({ x, y }) => {
    updateUser(users, socket.id, x, y);

    io.emit("update", users);
  });
};