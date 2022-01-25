import http, { Server } from "http";
//import Websocket from "ws";
import express from "express";
import SocketIO from "socket.io";


const app = express(); //express server

app.set("view engine", "pug")
app.set("views",__dirname+"/views");
app.use("/public", express.static(__dirname+"/public"));
app.get("/", (_, res) => res.render("home2"));
app.get("/*", (_, res) => res.redirect("/"))
const handleListen = () => console.log("Listening on ws://localhost:3000");

const server = http.createServer(app); //express 위에 http
const io = SocketIO(server);

io.on("connection", (socket) =>{
    socket.on("enter_room", (msg, done) => {
        console.log(msg);
        setTimeout(() => {
            done();
        }, 10000);
})});

//const wss = new Websocket.Server({server}); //express 위에 http, websocket
//const sockets = [];

// wss.on("connection",(socket)=>{ //소켓 커넥트
//     console.log("Connected to Browser");//연결됐을때 메세지 
//     sockets.push(socket);
//     socket["nickname"] = "anon"
//     socket.on("close", ()=>{
//         console.log("disconnected");
//     }); 
//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg);
//         if(message.type === "new_message") {
//             sockets.forEach(aSocket => aSocket.send(`${socket.nickname} : ${message.payload}`))
//         }
//         else if(message.type ==="nickname")
//         {
//             socket["nickname"] = message.payload;
//         }
//     })
// });


server.listen(3000, handleListen);