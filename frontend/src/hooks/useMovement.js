import { useEffect } from "react";
import { inputHandler } from "../game/engine/InputHandler";
import useGameStore from "../store/useGameStore";
import { socket } from "../socket/socket";
import { gameLoop } from "../game/engine/GameLoop";

const SPEED = 3;

const useMovement = () => {
  useEffect(() => {
    inputHandler.init();

    const move = () => {
      const { users, myId } = useGameStore.getState();
      const keys = inputHandler.keys;

      if (!myId || !users[myId]) return;

      let { x, y } = users[myId];

      if (keys.w) y -= SPEED;
      if (keys.s) y += SPEED;
      if (keys.a) x -= SPEED;
      if (keys.d) x += SPEED;

      socket.emit("move", { x, y });
    };

    gameLoop.subscribe(move);
    gameLoop.start();
  }, []);
};

export default useMovement;