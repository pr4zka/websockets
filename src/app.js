import express from "express";
import http from "http";
import morgan from "morgan";
import path from "path";
import { Server as WebsocketServer } from "socket.io";
import { connectDB } from "./db";
import sockets from "./sockets";
import { PORT } from "dotenv";
const app = express();
connectDB();



//middlewares
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));





//Server
const server = http.createServer(app);
const httpServer = server.listen(PORT);
console.log("Server on port ", PORT);
const io = new WebsocketServer(httpServer);
sockets(io)
