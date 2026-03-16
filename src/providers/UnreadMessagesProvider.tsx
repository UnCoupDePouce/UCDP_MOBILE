import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getSocket } from "../services/socketService";

interface UnreadMessagesContextType {
  unreadCount: number;
  resetUnread: () => void;
}

const UnreadMessagesContext = createContext<UnreadMessagesContextType>({
  unreadCount: 0,
  resetUnread: () => {},
});

export function UnreadMessagesProvider({ children }: { children: React.ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const listenerActive = useRef(false);

  const setupListener = () => {
    const token = localStorage.getItem("hasToken");
    if (!token || listenerActive.current) return;

    const socket = getSocket();

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

  // Essai immédiat au mount
  useEffect(() => {
    const cleanup = setupListener();

    // Si pas encore connecté (ex: splash screen), on réessaie toutes les secondes
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

export const useUnreadMessages = () => useContext(UnreadMessagesContext);
