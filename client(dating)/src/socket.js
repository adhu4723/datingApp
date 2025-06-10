import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  transports: ["websocket"], // ensures long polling fallback isn't used
});
