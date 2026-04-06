import * as PIXI from "pixi.js";

export const renderPlayers = (app, users, myId, playersRef) => {
  Object.entries(users).forEach(([id, user]) => {
    if (!playersRef.current[id]) {
      const circle = new PIXI.Graphics();

      circle.beginFill(id === myId ? 0x00ff00 : 0xff0000);
      circle.drawCircle(0, 0, 10);
      circle.endFill();

      app.stage.addChild(circle);
      playersRef.current[id] = circle;
    }

    // update position
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
};