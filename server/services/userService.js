export const addUser = (users, id) => {
  users[id] = {
    id,
    x: Math.random() * 500,
    y: Math.random() * 500,
    connections: new Set()
  };
};

export const updateUser = (users, id, x, y) => {
  if (!users[id]) return;
  users[id].x = x;
  users[id].y = y;
};

export const removeUser = (users, id) => {
  delete users[id];
};

export const getAllUsers = (users) => users;