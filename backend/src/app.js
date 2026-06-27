import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";

import connectToSocket from "./controller/socketManger.js";
import cors from "cors";
import userRoutes from "./route/userRoutes.js"

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);

app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));
app.use("/api/v1/users",userRoutes);



app.get("/home", (req, res) => {
  return res.json({ hello: "world" });
});

const start = async () => {
  try {
    const dbUrl = "mongodb://localhost:27017/zoom";

    await mongoose.connect(dbUrl);

    console.log("✅ MongoDB Connected");

    server.listen(app.get("port"), () => {
      console.log("🚀 Listening on port 8000");
    });
  } catch (err) {
    console.log("❌ DB Error:", err);
  }
};

start();
