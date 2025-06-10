const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../controllers/chatController");

// Send a message
router.post("/send", sendMessage);

// Get chat between two users
router.get("/:user1/:user2", getMessages);

module.exports = router;
