import PixiApp from "./game/renderer/PixiApp";
import useSocket from "./hooks/useSocket";
import useMovement from "./hooks/useMovement";
import { useEffect } from "react";
import { initProximitySystem } from "./game/systems/ProximitySystem";

import ChatBox from "./components/ChatBox";
import UserList from "./components/UserList";
import Navbar from "./components/Navbar";
import MiniMap from "./components/MiniMap";

function App() {
  useSocket();
  useMovement();

  useEffect(() => {
    initProximitySystem();
  }, []);

  return (
    <>
      <Navbar />
      <PixiApp />
      <UserList />
      <MiniMap />
      <ChatBox />
    </>
  );
}

export default App;