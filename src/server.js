import http from "http";
import express from "express";

const app = express();
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);