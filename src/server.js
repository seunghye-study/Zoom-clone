import http, { Server } from "http";
//import Websocket from "ws";
import express from "express";
import { Server } from "socket.io";

import { instrument } from "@socket.io/admin-ui";

const app = express(); //express server

app.set("view engine", "pug")
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home2"));
app.get("/*", (_, res) => res.redirect("/"))
const handleListen = () => console.log("Listening on ws://localhost:3000");

const server = http.createServer(app); //express 위에 http
const io = new Server(server, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true,
      },
});
instrument(io, {
    auth: false,
  });

function publicRooms () {
    const { sockets : {
        adapter: {sids, rooms},
    }, } = io;
    const publicRooms = [];
    rooms.forEach((_,key) => {
        if(sids.get(key) === undefined) {
            publicRooms.push(key);
        }
    });
    return publicRooms;
}

function countRooms(roomName) {
    return io.sockets.adapter.rooms.get(roomName)?.size;
}

io.on("connection", (socket) => {
    socket["nickname"] = "Anon";
    socket.onAny((event) => {
        console.log(`socket Event : ${event}`);
    });
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome", socket.nickname, countRooms(roomName));
        io.sockets.emit("room_change", publicRooms());
    });
    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => {
            socket.to(room).emit("bye", socket.nickname, countRooms(room)-1);
        });
        
    });
    socket.on("disconnect", () => {
        io.sockets.emit("room_change", publicRooms());
    });
    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", `${socket.nickname} : ${msg}`);
        done();
    });
    socket.on("new_nickname", nickname => socket["nickname"] = nickname);
});
server.listen(3000, handleListen);

