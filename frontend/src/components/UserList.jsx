import useGameStore from "../store/useGameStore";

const UserList = () => {
  const { users, myId } = useGameStore();

  return (
    <div className="fixed top-4 left-4 bg-gray-900 text-white p-3 rounded-lg shadow">
      <h2 className="text-sm mb-2">Online Users</h2>
      <ul className="text-xs">
        {Object.keys(users).map((id) => (
          <li key={id}>
            {id === myId ? "🟢 You" : "🔴 User"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;