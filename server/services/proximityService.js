// proximityService.js
import { PROXIMITY_RADIUS } from "../../shared/constants.js";
import { getRoomId } from "./roomService.js";

// ✅ Distance calculation
export const calculateDistance = (u1, u2) => {
  const dx = u1.x - u2.x;
  const dy = u1.y - u2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const handleProximity = (io, users) => {
  const ids = Object.keys(users);

  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const id1 = ids[i];
      const id2 = ids[j];

      const u1 = users[id1];
      const u2 = users[id2];

      // ✅ Safety check
      if (!u1 || !u2) continue;

      // ✅ Ensure connections exist
      if (!u1.connections) u1.connections = new Set();
      if (!u2.connections) u2.connections = new Set();

      const dist = calculateDistance(u1, u2);
      const room = getRoomId(id1, id2);

      // ✅ Get sockets once (optimization)
      const socket1 = io.sockets.sockets.get(id1);
      const socket2 = io.sockets.sockets.get(id2);

      if (!socket1 || !socket2) continue;

      // =======================
      // 🔥 ENTER PROXIMITY
      // =======================
      if (dist < PROXIMITY_RADIUS) {
        if (!u1.connections.has(id2)) {
          u1.connections.add(id2);
          u2.connections.add(id1);

          socket1.join(room);
          socket2.join(room);

          io.to(room).emit("proximity:join", {
            users: [id1, id2],
            room,
          });
        }
      }

      // =======================
      // ❌ EXIT PROXIMITY
      // =======================
      else {
        if (u1.connections.has(id2)) {
          u1.connections.delete(id2);
          u2.connections.delete(id1);

          socket1.leave(room);
          socket2.leave(room);

          io.to(room).emit("proximity:leave", {
            users: [id1, id2],
            room,
          });
        }
      }
    }
  }
};