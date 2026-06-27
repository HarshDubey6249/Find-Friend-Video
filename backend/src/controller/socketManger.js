// Import Socket.IO server
import { Server } from "socket.io";

// Store active connections (room-wise)
let connections = {};

// Store chat messages (room-wise)
let messages = {};

// Store user join time
let timeOnline = {};

const connectToSocket = (server) => {

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods:["GET","POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // ===============================
    // JOIN CALL
    // ===============================
    socket.on("join-call", (path) => {

      if (!connections[path]) {
        connections[path] = [];
      }

      connections[path].push(socket.id);

      timeOnline[socket.id] = new Date();

      connections[path].forEach((id) => {
        io.to(id).emit("user-joined", socket.id, connections[path]);
      });

      // FIX: correct key name
      if (messages[path]) {
        messages[path].forEach((msg) => {
          io.to(socket.id).emit(
            "chat-message",
            msg.data,
            msg.sender,
            msg.socketIdSender   // ✅ fixed
          );
        });
      }
    });

    // ===============================
    // SIGNAL
    // ===============================
    socket.on("signal", (toId, signalData) => {
      io.to(toId).emit("signal", socket.id, signalData);
    });

    // ===============================
    // CHAT MESSAGE
    // ===============================
    socket.on("chat-message", (data, sender) => {

      // FIX: simpler room detection
      let matchingRoom = null;

      for (let key in connections) {
        if (connections[key].includes(socket.id)) {
          matchingRoom = key;
          break;
        }
      }

      if (matchingRoom) {

        if (!messages[matchingRoom]) {
          messages[matchingRoom] = [];
        }

        messages[matchingRoom].push({
          sender: sender,
          data: data,
          socketIdSender: socket.id
        });

        console.log("message", matchingRoom, ":", sender, data);

        connections[matchingRoom].forEach((id) => {
          io.to(id).emit("chat-message", data, sender, socket.id);
        });
      }
    });

    // ===============================
    // DISCONNECT (FIXED MAIN PART)
    // ===============================
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      // FIX: calculate time safely
      let diffTime = Math.abs(new Date() - timeOnline[socket.id]);

      let key;

      // FIX: correct loop (removed broken JSON.parse, onrejectionhandled, isFinite)
      for (let k in connections) {
        let room = connections[k];

        if (room.includes(socket.id)) {
          key = k;

          // notify others
          for (let i = 0; i < connections[key].length; i++) {
            io.to(connections[key][i]).emit("user-left", socket.id); // ✅ fixed emit
          }

          // remove user
          let index = connections[key].indexOf(socket.id);
          if (index !== -1) {
            connections[key].splice(index, 1);
          }

          // delete room if empty
          if (connections[key].length === 0) {
            delete connections[key]; // ✅ fixed
          }

          break;
        }
      }

      delete timeOnline[socket.id];
    });
  });

  return io;
};

export default connectToSocket;