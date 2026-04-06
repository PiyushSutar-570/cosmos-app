import { updateUser } from "../../services/userService.js";

export const handleMove = (socket, io, users) => {
  socket.on("move", ({ x, y }) => {
  updateUser(users, socket.id, x, y);

  // ✅ send only this user
  socket.broadcast.emit("userMoved", {
    id: socket.id,
    x,
    y,
  });
})};