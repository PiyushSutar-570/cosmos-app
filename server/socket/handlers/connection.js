import { addUser, getAllUsers } from "../../services/userService.js";

export const handleConnection = (socket, io, users) => {
  console.log("Connected:", socket.id);

  addUser(users, socket.id);

  socket.emit("init", {
    id: socket.id,
    users: getAllUsers(users)
  });

  socket.broadcast.emit("userJoined", {
    id: socket.id,
    user: users[socket.id]
  });
};