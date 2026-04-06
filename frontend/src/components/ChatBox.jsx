import { useState } from "react";
import useChatStore from "../store/useChatStore";
import useGameStore from "../store/useGameStore";
import { socket } from "../socket/socket";

const ChatBox = () => {
  const { activeRooms, messages } = useChatStore();
  const { myId } = useGameStore();

  const [input, setInput] = useState("");

  const activeUserIds = Object.keys(activeRooms);
  if (activeUserIds.length === 0) return null;

  const activeUserId = activeUserIds[0]; // simple: 1-to-1 chat
  if (!activeUserId) return null;

  const room = [myId, activeUserId].sort().join("_");
  const roomMessages = messages[room] || [];

  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("sendMessage", {
      targetId: activeUserId,
      message: input,
    });

    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-gray-900 text-white rounded-xl shadow-lg p-3">
      <div className="h-40 overflow-y-auto mb-2 text-sm">
        {roomMessages.map((msg, i) => (
          <div key={i} className="mb-1">
            <span className="text-green-400">{msg.from === myId ? "Me" : "User"}:</span>{" "}
            {msg.message}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 px-2 py-1 rounded bg-gray-800"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 px-3 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;