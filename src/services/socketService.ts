import { io, Socket } from "socket.io-client";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket || !socket.connected) {
    const token = localStorage.getItem("hasToken");
    socket = io(BACKEND_URL, {
      auth: { token },
      transports: ["websocket"],
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
