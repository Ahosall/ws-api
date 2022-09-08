const socketIO = require("socket.io");

console.log("\n🌐 | Socket.IO started");

let users = [];

module.exports = (server) => {
  const io = socketIO(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log(`📶 | ${socket.id} user just connected!`);

    socket.on("newUser", (data) => {
      users.push(data);
      io.emit("newUserRes", users);
    });

    socket.on("typing", (data) => {
      socket.broadcast.emit("typingResponse", data);
    });

    socket.on("msgSend", (data) => {
      io.emit("msgResponse", data);
    });

    socket.on("disconnect", () => {
      users = users.filter((u) => u.socketID !== socket.id);
      console.log(`📴 | A user disconnected`);
    });
  });
};
