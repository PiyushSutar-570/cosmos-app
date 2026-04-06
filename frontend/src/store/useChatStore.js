import { create } from "zustand";

const useChatStore = create((set) => ({
  messages: {},       // { roomId: [messages] }
  activeRooms: {},    // { userId: true }

  addRoom: (userId) =>
    set((state) => ({
      activeRooms: {
        ...state.activeRooms,
        [userId]: true,
      },
    })),

  removeRoom: (userId) =>
    set((state) => {
      const updated = { ...state.activeRooms };
      delete updated[userId];
      return { activeRooms: updated };
    }),

  addMessage: (room, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [room]: [...(state.messages[room] || []), message],
      },
    })),
}));

export default useChatStore;