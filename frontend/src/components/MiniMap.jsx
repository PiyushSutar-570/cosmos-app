import useGameStore from "../store/useGameStore";

const MiniMap = () => {
  const { users, myId } = useGameStore();

  return (
    <div className="fixed bottom-4 left-4 w-40 h-40 bg-gray-800 rounded-lg p-2">
      <div className="relative w-full h-full bg-black">
        {Object.entries(users).map(([id, user]) => (
          <div
            key={id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${user.x / 5}px`,
              top: `${user.y / 5}px`,
              background: id === myId ? "lime" : "red",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MiniMap;