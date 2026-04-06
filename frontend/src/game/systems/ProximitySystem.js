import useGameStore from "../../store/useGameStore";
import useChatStore from "../../store/useChatStore";
import { getDistance } from "../../utils/distance";
import { socket } from "../../socket/socket";

const RADIUS = 120;

export const initProximitySystem = () => {
  setInterval(() => {
    const { users, myId } = useGameStore.getState();
    const { activeRooms, addRoom, removeRoom } = useChatStore.getState();

    if (!myId || !users[myId]) return;

    const me = users[myId];

    Object.entries(users).forEach(([id, user]) => {
      if (id === myId) return;

      const dist = getDistance(me, user);

      if (dist < RADIUS) {
        // join if not already connected
        if (!activeRooms[id]) {
          socket.emit("joinRoom", { targetId: id });
          addRoom(id);
        }
      } else {
        // leave if previously connected
        if (activeRooms[id]) {
          socket.emit("leaveRoom", { targetId: id });
          removeRoom(id);
        }
      }
    });
  }, 300); // check every 300ms
};