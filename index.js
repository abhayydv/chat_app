const express = require("express");
const htp = require('http');
const {Server} = require("socket.io");
const path = require("path");


const app = express();
const server = htp.createServer(app);

const io = new Server(server);

app.use(express.static(path.resolve("./public")));

io.on("connection", (socket) => {
    socket.on("user-message", (message) => {
            io.emit("message", {
                id: socket.id,
                message: message
            });
    });
});

app.get("/",(req,res) => {
    console.log(path.resolve("/public/page.html"));
    console.log(path.resolve("./public/page.html"));
    return res.sendFile(path.resolve("/public/page.html"));
});

const port = 9090;

server.listen(port,() => {
     console.log(`Server is connected on port ${port}`);
});
