import * as React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { SocketService } from "../service/socket.service.ts";

interface UnreadMessagesContextType {
  unreadCount: number;
  resetUnread: () => void;
}

const UnreadMessagesContext = createContext<UnreadMessagesContextType>({
  unreadCount: 0,
  resetUnread: () => {},
});

export function UnreadMessagesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [unreadCount, setUnreadCount] = useState(0);
  const listenerActive = useRef(false);

  const setupListener = () => {
    const token = localStorage.getItem("hasToken");
    if (!token || listenerActive.current) return;

    const socket = SocketService.getSocket();

    const onNewMessage = (msg: { id_destinataire: string }) => {
      const myId = localStorage.getItem("user_id") ?? "";
      if (myId && msg.id_destinataire === myId) {
        setUnreadCount((prev) => prev + 1);
      }
    };

    socket.on("new_message", onNewMessage);
    listenerActive.current = true;

    return () => {
      socket.off("new_message", onNewMessage);
      listenerActive.current = false;
    };
  };

  useEffect(() => {
    const cleanup = setupListener();

    if (!cleanup) {
      const interval = setInterval(() => {
        const result = setupListener();
        if (result) clearInterval(interval);
      }, 1000);

      return () => clearInterval(interval);
    }

    return cleanup;
  }, []);

  const resetUnread = () => setUnreadCount(0);

  return (
    <UnreadMessagesContext.Provider value={{ unreadCount, resetUnread }}>
      {children}
    </UnreadMessagesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUnreadMessages = () => useContext(UnreadMessagesContext);
