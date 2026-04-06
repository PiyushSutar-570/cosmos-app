import { socket } from "../../socket/socket";
import useGameStore from "../../store/useGameStore";

const SPEED = 5;

export const initMovement = () => {
  const handleKey = (e) => {
    const state = useGameStore.getState();
    const myId = state.myId;
    const users = state.users;

    if (!myId || !users[myId]) return;

    let { x, y } = users[myId];

    if (e.key === "w") y -= SPEED;
    if (e.key === "s") y += SPEED;
    if (e.key === "a") x -= SPEED;
    if (e.key === "d") x += SPEED;

    socket.emit("move", { x, y });
  };

  window.addEventListener("keydown", handleKey);
};