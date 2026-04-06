import useGameStore from "../../store/useGameStore";

export const syncPlayers = (serverUsers) => {
  const state = useGameStore.getState();
  const currentUsers = state.users;

  const updatedUsers = { ...currentUsers };

  Object.entries(serverUsers).forEach(([id, user]) => {
    updatedUsers[id] = user;
  });

  // remove missing users
  Object.keys(updatedUsers).forEach((id) => {
    if (!serverUsers[id]) {
      delete updatedUsers[id];
    }
  });

  useGameStore.setState({ users: updatedUsers });
};