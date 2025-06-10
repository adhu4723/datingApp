const Message = require('../model/Message');

// @desc    Send a message
// @route   POST /api/chat/send
exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;

    console.log(req.body);
    

    if (!sender || !receiver || !content) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new Message({ sender, receiver, content });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Send Message Error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

// @desc    Get messages between two users
// @route   GET /api/chat/:user1/:user2
exports.getMessages = async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 },
      ],
    }).populate("sender", "name")      // 👈 Get sender's name
.populate("receiver", "name") .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.error("Get Messages Error:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};


