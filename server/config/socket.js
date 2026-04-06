import { Server } from "socket.io";
import { handleConnection } from "../socket/handlers/connection.js";
import { handleMove } from "../socket/handlers/movement.js";
import { handleDisconnect } from "../socket/handlers/disconnect.js";
import { handleProximity } from "../services/proximityService.js";
import { TICK_RATE } from "../../shared/constants.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  const users = {};

  io.on("connection", (socket) => {
    handleConnection(socket, io, users);
    handleMove(socket, io, users);
    handleDisconnect(socket, io, users);
  });

  // 🔥 Proximity loop (game tick)
  setInterval(() => {
    handleProximity(io, users);
  }, TICK_RATE);

  return io;
};