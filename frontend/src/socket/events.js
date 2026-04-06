import { socket } from "./socket";
import useChatStore from "../store/useChatStore";

export const registerSocketEvents = () => {
  const addMessage = useChatStore.getState().addMessage;

  socket.on("receiveMessage", (data) => {
    addMessage(data.room, data);
  });

  socket.on("proximity:join", ({ users }) => {
    const myId = socket.id;
    const other = users.find((id) => id !== myId);

    useChatStore.getState().addRoom(other);
  });

  socket.on("proximity:leave", ({ users }) => {
    const myId = socket.id;
    const other = users.find((id) => id !== myId);

    useChatStore.getState().removeRoom(other);
  });
};