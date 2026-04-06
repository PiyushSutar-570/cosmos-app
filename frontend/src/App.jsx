import PixiApp from "./game/renderer/PixiApp";
import useSocket from "./hooks/useSocket";
import useMovement from "./hooks/useMovement";

import ChatBox from "./components/ChatBox";
import UserList from "./components/UserList";
import Navbar from "./components/Navbar";
import MiniMap from "./components/MiniMap";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    // initialize systems once
  }, []);

  useSocket();
  useMovement();


  return (
    <>
  <Navbar />
  <PixiApp />

  <div style={{ color: "white", position: "absolute", top: 60 }}>
    UI Working
  </div>

  <UserList />
  <MiniMap />
  <ChatBox />
</>
  );
}

export default App;