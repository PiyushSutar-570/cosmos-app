import useGameStore from "../store/useGameStore";

const usePlayer = () => {
  const users = useGameStore((s) => s.users);
  const myId = useGameStore((s) => s.myId);

  const me = users[myId] || null;

  return {
    me,
    users,
    myId,
  };
};

export default usePlayer;