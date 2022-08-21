import express, { json, urlencoded } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";
import cors from "cors";
import AppDataSource from "./data-source";
import userRoutes from "./routes/userRoutes"
import usersRoutes from "./routes/usersRoutes"
import messageRoutes from "./routes/messageRoute"
import conversationRoutes from "./routes/conversationRoute"
import { Server, Socket } from 'socket.io';
import http from "http";
import auth from "./middleware/auth";

const app = express();

config();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/user", userRoutes);
app.use("/users", auth, usersRoutes);
app.use("/message", auth, messageRoutes);
app.use("/conversation", auth, conversationRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  socket.on("join_conversation", (conversation_id) => {
    socket.join(conversation_id);
  })

  socket.on("send_message", (data) => {
     socket.to(data.id).emit("recieve_message", data);
  })

  socket.on("send_group_message", (data) => {
    socket.to(data.id).emit("recieve_group_message", data);
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