import { Application, Graphics } from "pixi.js";
import { useEffect, useRef } from "react";
import useGameStore from "../../store/useGameStore";

const PixiApp = () => {
  const containerRef = useRef(null);
  const appRef = useRef(null);
  const playersRef = useRef({});

  const users = useGameStore((s) => s.users);
  const myId = useGameStore((s) => s.myId);

  // ✅ INIT PIXI
  useEffect(() => {
    let app;

    const initPixi = async () => {
      app = new Application();
      await app.init({
        resizeTo: window,
        background: "#111111",
      });

      if (containerRef.current) {
        containerRef.current.appendChild(app.canvas);
      }

      appRef.current = app;
    };

    initPixi();

    return () => {
      app?.destroy();
    };
  }, []);

  // ✅ UPDATE PLAYERS
  useEffect(() => {
    const app = appRef.current;
    if (!app || !app.stage) return;

    Object.entries(users).forEach(([id, user]) => {
      if (!playersRef.current[id]) {
        const circle = new Graphics()
          .circle(0, 0, 10)
          .fill(id === myId ? 0x00ff00 : 0xff0000);

        app.stage.addChild(circle);
        playersRef.current[id] = circle;
      }

      playersRef.current[id].position.set(user.x, user.y);
    });

    // remove players
    Object.keys(playersRef.current).forEach((id) => {
      if (!users[id]) {
        const player = playersRef.current[id];
        app.stage.removeChild(player);
        player.destroy();
        delete playersRef.current[id];
      }
    });
  }, [users, myId]);

  return <div ref={containerRef} />;
};

export default PixiApp;