import React, { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import axios from "axios";
import { SendHorizontal } from 'lucide-react';

const Chat = ({ senderId, receiverId }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [receiver, setReceiver] = useState("");

  const bottomRef = useRef(null); // 👈 Reference to the bottom of chat

  // ✅ Fetch chat history and receiver info
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/chat/${senderId}/${receiverId}`);
        setChat(res.data);
      } catch (error) {
        console.error("Failed to load chat history:", error);
      }
    };

    const fetchReceiver = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/user/${receiverId}`);
        setReceiver(res.data.user || "User");
      } catch (err) {
        console.error("Failed to load receiver info:", err);
        setReceiver("User");
      }
    };

    fetchMessages();
    fetchReceiver();
  }, [senderId, receiverId]);

  // ✅ Listen for new incoming messages
  useEffect(() => {
    const handleReceive = (newMsg) => {
      setChat((prev) => [...prev, newMsg]);
    };

    socket.on("receive_message", handleReceive);
    return () => socket.off("receive_message", handleReceive);
  }, []);

  // ✅ Scroll to bottom when chat updates
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  // ✅ Send a message
  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      sender: senderId,
      receiver: receiverId,
      content: message,
    };
    socket.emit("send_message", msgData);
    setMessage("");
  };

  // ✅ Format time
  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white h-[85vh] relative">
      {/* Receiver name at top */}
      <h2 className="text-lg font-semibold text-center border-b border-gray-100 pb-2 flex items-center gap-2">
        <img width={50} className="rounded-full h-12" src={receiver.profileImage} alt="" /> {receiver.name}
      </h2>

      {/* Chat messages */}
      <div className="h-[67vh] overflow-y-auto p-3 rounded bg-gray-50 shadow-sm">
        {chat.map((msg, idx) => {
          const isOwnMessage = (msg.sender?._id || msg.sender) === senderId;

          return (
            <div
              key={idx}
              className={`my-2 flex ${isOwnMessage ? "justify-end" : "justify-start relative mb-10"}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  isOwnMessage ? "bg-red-500 text-white" : "bg-gray-200 text-black ml-6"
                }`}
              >
                <p className="whitespace-pre-line">{msg.content}</p>
                <p className="text-xs text-right mt-1 opacity-70">
                  {formatTime(msg.createdAt)}
                </p>
              </div>

              {!isOwnMessage && (
                <img
                  width={30}
                  className="rounded-full absolute h-7 -bottom-6 shadow"
                  src={receiver.profileImage}
                  alt=""
                />
              )}
            </div>
          );
        })}
        <div ref={bottomRef} /> {/* 👈 Auto-scroll target */}
      </div>

      {/* Input */}
      <div className="flex gap-2 mt-3 absolute w-[95%] bottom-0 mx-auto justify-center">
        <input
          className="flex-grow border border-gray-300 px-3 py-2 rounded-2xl outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
          onClick={sendMessage}
        >
          <SendHorizontal />
        </button>
      </div>
    </div>
  );
};

export default Chat;
