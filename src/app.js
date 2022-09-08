require("dotenv").config();
console.clear();

const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 4000;

console.log("🚀 | API Started...");
app.use(cors());

require("./utils/socket")(server);

app.get("/api", (req, res, next) => {
  res.json({
    api: {
      status: "online",
    },
  });
});

server.listen(port, () => console.log("\n🔈 | API listen on port", port, "\n"));
