import express, { json, urlencoded } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";
import cors from "cors";
import AppDataSource from "./data-source";
import userRoutes from "./routes/userRoutes"
import messageRoutes from "./routes/messageRoute"
import conversationRoutes from "./routes/conversationRoute"
import {Server}  from "socket.io";
import http from "http";

const app = express();

config();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/user", userRoutes);
app.use("/message", messageRoutes);
app.use("/conversation", conversationRoutes);

const server = http.createServer(app);
const io = new Server(server);

console.log(process.env.PORT)

server.listen(process.env.PORT, () => {
  console.log(`listening on port: ${process.env.PORT}`);
  AppDataSource.initialize();
})
