const users = [];

/**
 * Check if user has already been added to array of users otherwise adds the user to the array of users.
 */
const addUser = ({ id, name, room }) => {
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (!name || !room) {
    return { error: "Username and room are required." };
  }

  if (existingUser) {
    console.log(`Existing user ${name} has joined room ${room}.`);
    const user = getUserByNameAndRoom(name, room);

    return { user, existingUser };
  }

  const user = { id, name, room };

  users.push(user);
  console.log(`User ${name} has been added.`);

  return { user };
};

/**
 * Removes a user by id.
 */
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

/**
 * Removes a user by id and room.
 */
const removeUserByNameAndRoom = (name, room) => {
  const index = users.findIndex(
    (user) => user.name === name && user.room === room
  );

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

/**
 * Returns the user based on supplied id.
 */
const getUser = (id) => users.find((user) => user.id === id);

/**
 * Returns the user based on name and in what room.
 */
const getUserByNameAndRoom = (name, room) =>
  users.find((user) => user.name === name && user.room === room);

/**
 * Returns all users in a specific room.
 */
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {
  addUser,
  removeUser,
  removeUserByNameAndRoom,
  getUser,
  getUserByNameAndRoom,
  getUsersInRoom,
};
