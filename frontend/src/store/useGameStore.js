import { create } from "zustand";

const useGameStore = create((set) => ({
  users: {},
  myId: null,

  setUsers: (users) => set({ users }),

  addUser: (id, user) =>
    set((state) => ({
      users: { ...state.users, [id]: user },
    })),

  removeUser: (id) =>
    set((state) => {
      const updated = { ...state.users };
      delete updated[id];
      return { users: updated };
    }),

  setMyId: (id) => set({ myId: id }),
}));

export default useGameStore;