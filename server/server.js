const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const {
  addUser,
  removeUser,
  getUserByNameAndRoom,
  getUsersInRoom,
} = require("./users");

// Uses Heroku port or port 5000 for local development.
const PORT = process.env.PORT || 5000;

// Creates the express application with socketio.
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

/**
 * Socket.io creates a connection on socket.
 */
io.on("connection", (socket) => {
  /**
   * When a "join-event" is emitted in the front-end, the user will either be added to the array of users or if the
   * user already exists in the room, will return the existingUser. And will emit a message from admin to the front-end.
   */
  socket.on("join", ({ name, room }, callback) => {
    const { error, user, existingUser } = addUser({
      id: socket.id,
      name,
      room,
    });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    console.log(`User ${user.name} has joined the room ${user.room}.`);

    if (existingUser) {
      socket.emit("message", {
        user: "Admin",
        text: `Welcome back to chatroom ${user.room}, ${user.name}.`,
      });
    } else {
      socket.emit("message", {
        user: "Admin",
        text: `Welcome to chatroom ${user.room}, ${user.name}.`,
      });
    }

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "Admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  /**
   * On emit "sendMessage-event" in the front-end. Sends the message to the correct chatroom.
   */
  socket.on("sendMessage", (message, dateCreated, name, room, callback) => {
    const user = getUserByNameAndRoom(name, room);

    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
      dateCreated,
    });

    callback();
  });

  /**
   * On "disconnect-event" from front-end. Display a admin message to chatroom saying what user has left.
   */
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

/**
 * Starts the server.
 */
server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
