import * as PIXI from "pixi.js";
import { useEffect, useRef } from "react";
import useGameStore from "../../store/useGameStore";
import { renderPlayers } from "./RenderWorld";


const PixiApp = () => {
  const containerRef = useRef(null);
  const users = useGameStore((s) => s.users);
  const myId = useGameStore((s) => s.myId);

  const appRef = useRef(null);
  const playersRef = useRef({});

  useEffect(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x111111,
    });

    renderPlayers(app, users, myId, playersRef);

    containerRef.current.appendChild(app.view);
    appRef.current = app;

    return () => {
      app.destroy(true, true);
    };
  }, []);

  useEffect(() => {
    const app = appRef.current;
    if (!app) return;

    Object.entries(users).forEach(([id, user]) => {
      if (!playersRef.current[id]) {
        const circle = new PIXI.Graphics();
        circle.beginFill(id === myId ? 0x00ff00 : 0xff0000);
        circle.drawCircle(0, 0, 10);
        circle.endFill();

        app.stage.addChild(circle);
        playersRef.current[id] = circle;
      }

      playersRef.current[id].x = user.x;
      playersRef.current[id].y = user.y;
    });

    // remove disconnected players
    Object.keys(playersRef.current).forEach((id) => {
      if (!users[id]) {
        app.stage.removeChild(playersRef.current[id]);
        delete playersRef.current[id];
      }
    });
  }, [users]);

  return <div ref={containerRef} />;
};

export default PixiApp;