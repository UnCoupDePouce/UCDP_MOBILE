import { Outlet, useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Header } from "../../components/navigation/Header.tsx";
import { useUnreadMessages } from "../../providers/UnreadMessagesProvider.tsx";

interface Conversation {
  contact_id: string;
  nom: string;
  prenom: string;
  last_message: string;
}

export default function Layout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { resetUnread } = useUnreadMessages();

  useEffect(() => {
    resetUnread();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("hasToken");
    fetch("/local/api/messages/conversations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setConversations(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="flex h-screen bg-white dark:bg-neutral-950 overflow-hidden">
      <aside
        className={`w-full md:w-[400px] shrink-0 border-r border-gray-100 dark:border-white/5 flex flex-col ${id ? "hidden md:flex" : "flex"}`}
      >
        <Header title="Messages" showButton={false} className="md:hidden" />
        <div className="flex-1 overflow-y-auto px-6 space-y-3 pt-4">
          {conversations.length === 0 && (
            <p className="text-xs text-gray-400 dark:text-neutral-600 text-center mt-8 uppercase font-black tracking-widest">
              Aucune conversation
            </p>
          )}
          {conversations.map((chat) => (
            <button
              key={chat.contact_id}
              onClick={() => navigate(`/message/${chat.contact_id}`)}
              className={`w-full p-4 rounded-[24px] flex items-center gap-4 transition-all ${id === chat.contact_id ? "bg-black text-white dark:bg-white dark:text-black" : "bg-gray-50 dark:bg-neutral-900"}`}
            >
              <div className="size-10 rounded-xl bg-gray-200 dark:bg-neutral-700 flex items-center justify-center shrink-0">
                <span className="text-xs font-black uppercase text-gray-600 dark:text-neutral-300">
                  {chat.prenom?.[0]}{chat.nom?.[0]}
                </span>
              </div>
              <div className="flex flex-col items-start overflow-hidden">
                <span className="font-black uppercase text-[10px] truncate">
                  {chat.prenom} {chat.nom}
                </span>
                <span className="text-[10px] text-gray-400 dark:text-neutral-500 truncate max-w-[180px]">
                  {chat.last_message}
                </span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <main
        className={`flex-1 flex flex-col relative ${!id ? "hidden md:flex" : "flex"}`}
      >
        <Outlet />
      </main>
    </div>
  );
}
