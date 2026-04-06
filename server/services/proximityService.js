import { PROXIMITY_RADIUS } from "../../shared/constants.js";
import { getRoomId } from "./roomService.js";

export const calculateDistance = (u1, u2) => {
  return Math.sqrt(
    (u1.x - u2.x) ** 2 + (u1.y - u2.y) ** 2
  );
};

export const handleProximity = (io, users) => {
  const ids = Object.keys(users);

  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const id1 = ids[i];
      const id2 = ids[j];

      const u1 = users[id1];
      const u2 = users[id2];

      const dist = calculateDistance(u1, u2);
      const room = getRoomId(id1, id2);

      if (dist < PROXIMITY_RADIUS) {
        if (!u1.connections.has(id2)) {
          u1.connections.add(id2);
          u2.connections.add(id1);

          io.sockets.sockets.get(id1)?.join(room);
          io.sockets.sockets.get(id2)?.join(room);

          io.to(room).emit("proximity:join", {
            users: [id1, id2],
            room
          });
        }
      } else {
        if (u1.connections.has(id2)) {
          u1.connections.delete(id2);
          u2.connections.delete(id1);

          io.sockets.sockets.get(id1)?.leave(room);
          io.sockets.sockets.get(id2)?.leave(room);

          io.to(room).emit("proximity:leave", {
            users: [id1, id2],
            room
          });
        }
      }
    }
  }
};