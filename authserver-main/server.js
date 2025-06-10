const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust in production
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chatRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use('/uploads', express.static('uploads'));

// ✅ Import Message model to save chats
const Message = require("./model/Message");

// ✅ Socket.IO events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", async (data) => {
    const { sender, receiver, content } = data;

    if (!sender || !receiver || !content) {
      console.log("Missing sender, receiver, or content");
      return;
    }

    try {
      // ✅ Save to MongoDB
      const newMessage = new Message({ sender, receiver, content });
      const savedMsg = await newMessage.save();

      // ✅ Populate sender and receiver (assumes they are ObjectIds referencing the User model)
      const populatedMsg = await Message.findById(savedMsg._id)
        .populate("sender", "name")
        .populate("receiver", "name");

      // ✅ Emit populated message
      io.emit("receive_message", populatedMsg);
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// MongoDB + Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => server.listen(5000, () => console.log("Server running with Socket.IO on port 5000")))
  .catch((err) => console.error(err));
