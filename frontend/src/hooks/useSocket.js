import { useEffect } from "react";
import { socket } from "../socket/socket";
import useGameStore from "../store/useGameStore";
import { registerSocketEvents } from "../socket/events";

import { syncPlayers } from "../game/systems/SyncSystem";

const useSocket = () => {
  const setUsers = useGameStore((s) => s.setUsers);
  const addUser = useGameStore((s) => s.addUser);
  const removeUser = useGameStore((s) => s.removeUser);

  const setMyId = useGameStore((s) => s.setMyId);

  useEffect(() => {
    socket.on("init", ({ id, users }) => {
      setUsers(users);
    });

    socket.on("update", (users) => {
        syncPlayers(users);
    });

    socket.on("userJoined", ({ id, user }) => {
      addUser(id, user);
    });

    socket.on("userLeft", (id) => {
      removeUser(id);
    });


    socket.on("init", ({ id, users }) => {
    setMyId(id);   // 🔥 VERY IMPORTANT
    setUsers(users);
    });

    return () => {
      socket.off("init");
      socket.off("update");
      socket.off("userJoined");
      socket.off("userLeft");
    };
  }, []);

  useEffect(() => {
    registerSocketEvents();
  }, []);
};

export default useSocket;