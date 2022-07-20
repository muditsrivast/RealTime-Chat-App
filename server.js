const express = require("express");
const app = express();
const http = require("http").createServer(app);

let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 9000;
}

http.listen(PORT, () => {
  console.log(`Listing at port ${PORT}`);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Socket

const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("Connected...");

  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
