import express, { json, urlencoded } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";
import cors from "cors";
import AppDataSource from "./data-source";
import userRoutes from "./routes/userRoutes"
import messageRoutes from "./routes/messageRoute"
import conversationRoutes from "./routes/conversationRoute"
import { Server, Socket } from 'socket.io';
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
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`user: ${socket.id} connected to the database`) 
  socket.on("join_conversation", (conversation_id) => {
    socket.join(conversation_id);
    console.log(`user joined conversation no.: ${conversation_id}`)


    
    
  })
})
/*
//send and get message
socket.on("sendMessage", ({ sender_email, receiver_email, text }) => {
  const user = getUser(receiver_email);
  io.to(user.socket.id).emit("getMessage", {
    sender_email,
    text,
  });
});
*/


server.listen(process.env.PORT, () => {
  console.log(`listening on port: ${process.env.PORT}`);
  AppDataSource.initialize();
})