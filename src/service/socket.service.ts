import {io, Socket} from "socket.io-client";

let socket: Socket | null = null;

export const SocketService = {
    getSocket: (): Socket => {
        if (!socket || !socket.connected) {
            const token = localStorage.getItem("hasToken");
            socket = io("local", {
                auth: {token},
                transports: ["websocket"],
            });
        }
        return socket;
    },
    disconnectSocket: () => {
        if (socket) {
            socket.disconnect();
            socket = null;
        }
    }
}