const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("message", ({name, message, date_created}) => {
        io.emit("message", {name, message, date_created})
    })

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

http.listen(4000, function () {
  console.log("Listening on port 4000");
});
