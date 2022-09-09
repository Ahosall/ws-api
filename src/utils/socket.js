const socketIO = require("socket.io");

console.log("\n🌐 | Socket.IO started");

let users = [];

module.exports = (server) => {
  const io = socketIO(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log(`📶 | ${socket.id} user just connected!`);

    socket.on("newUser", (data) => {
      users.push(data);

      socket.broadcast.emit("msgResponse", {
        text: `enter the chat...`,
        name: data.userName,
        id: `SYSTEM`,
        socketID: socket.id,
      });

      io.emit("newUserRes", users);
    });

    socket.on("typing", (data) => {
      socket.broadcast.emit("typingResponse", data);
    });

    socket.on("msgSend", (data) => {
      io.emit("msgResponse", data);
    });

    socket.on("disconnect", () => {
      let user = users.filter((u) => u.socketID == socket.id)[0];

      users = users.filter((u) => u.socketID !== socket.id);
      console.log(`📴 | A user disconnected`);

      io.emit("newUserRes", users);

      if (user) {
        io.emit("msgResponse", {
          text: `left the chat...`,
          name: user.userName,
          id: "SYSTEM",
          socketID: socket.id,
        });
      }
    });
  });
};
