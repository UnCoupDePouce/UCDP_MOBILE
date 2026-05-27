import {io, Socket} from "socket.io-client";

let socket: Socket | null = null;

// Même backend que l'API REST (/api → ucdp-backend.onrender.com)
// Peut être surchargé via VITE_SOCKET_URL pour dev local
const SOCKET_URL: string =
    (import.meta.env.VITE_SOCKET_URL as string) ?? "https://ucdp-backend.onrender.com";

export const SocketService = {
    getSocket: (): Socket => {
        if (!socket) {
            const token = localStorage.getItem("hasToken");
            socket = io(SOCKET_URL, {
                auth: {token},
                transports: ["polling", "websocket"],
                reconnectionDelay: 1000,
                reconnectionDelayMax: 3000,
                timeout: 10000,
            });

            // Debug global de connexion
            socket.on("connect", () =>
                console.log("[Socket] connecté →", SOCKET_URL, "| id:", socket?.id)
            );
            socket.on("connect_error", (err) =>
                console.error("[Socket] connect_error →", err.message)
            );
            socket.on("disconnect", (reason) =>
                console.warn("[Socket] déconnecté →", reason)
            );
        }
        return socket;
    },
    disconnectSocket: () => {
        if (socket) {
            socket.disconnect();
            socket = null;
        }
    },
};
