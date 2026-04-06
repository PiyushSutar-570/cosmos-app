import { socket } from "./socket";
import useChatStore from "../store/useChatStore";

export const registerSocketEvents = () => {
  const addMessage = useChatStore.getState().addMessage;

  socket.on("receiveMessage", (data) => {
    addMessage(data.room, data);
  });

  socket.on("proximity:join", ({ room }) => {
    console.log("Joined proximity room:", room);
  });

  socket.on("proximity:leave", ({ room }) => {
    console.log("Left proximity room:", room);
  });
};