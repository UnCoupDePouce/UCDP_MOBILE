import {CheckCheck, MessageSquare} from "lucide-react";
import Header from "../../components/Header/Header.tsx";
import {useNavigate} from "react-router";

interface ChatItem {
    id: string;
    name: string;
    avatar: string;
    role: string;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    isOnline: boolean;
}

export default function ChatPage() {
    const navigate = useNavigate();
    const chats: ChatItem[] = [
        {
            id: "1",
            name: "Thomas ZABALO",
            avatar: "TZ",
            role: "Ébéniste",
            lastMessage: "Bonjour, le ponçage de la commode est terminé. Je m'attaque au vernis demain !",
            timestamp: "14:32",
            unreadCount: 2,
            isOnline: true,
        },
        {
            id: "2",
            name: "Marie LEFEBVRE",
            avatar: "ML",
            role: "Plombier",
            lastMessage: "Je peux passer vendredi à partir de 14h pour le devis.",
            timestamp: "Hier",
            unreadCount: 0,
            isOnline: false,
        },
        {
            id: "3",
            name: "Julien ROUX",
            avatar: "JR",
            role: "Électricien",
            lastMessage: "Merci pour votre confiance, à bientôt !",
            timestamp: "3 jours",
            unreadCount: 0,
            isOnline: false,
        },
    ];

    const handleChatClick = (chat: ChatItem) => {
        navigate(`/chat/${chat.id}`, {
            state: {
                contact: chat,
                from: "/chat"
            }
        });
    };
    
    return (
        <>
            <div
                className="w-full mx-auto h-screen flex flex-col">
                <Header name={"Messages"}/>
                <main className="flex-1 mt-20 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800/60">
                    {chats.length > 0 ? (
                        chats.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => handleChatClick(chat)}
                                className="flex items-start gap-3 p-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/40">
                                <div className="relative shrink-0">
                                    <div
                                        className="w-12 h-12 rounded-xl bg-base-200 font-black flex items-center justify-center text-sm tracking-tighter">
                                        {chat.avatar}
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline justify-between mb-0.5">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                            <h2 className={`text-sm font-bold truncate ${chat.unreadCount > 0 ? "font-black" : ""}`}>
                                                {chat.name}
                                            </h2>
                                            <span
                                                className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 shrink-0">
                                            {chat.role}
                                        </span>
                                        </div>
                                        <span
                                            className="text-[10px] text-gray-400 dark:text-gray-500 font-medium shrink-0">
                                        {chat.timestamp}
                                    </span>
                                    </div>

                                    <p className={`text-xs leading-relaxed truncate pr-2
                                    ${chat.unreadCount > 0 ? "text-gray-900 dark:text-white font-semibold" : "text-gray-500 dark:text-gray-400"}
                                `}>
                                        {chat.lastMessage}
                                    </p>
                                </div>

                                <div className="flex flex-col items-end justify-between h-10 shrink-0">
                                    {chat.unreadCount > 0 ? (
                                        <span
                                            className="min-w-5 h-5 px-1.5 flex items-center justify-center bg-warning text-black font-black text-[10px] rounded-full">
                                        {chat.unreadCount}
                                    </span>
                                    ) : (
                                        <CheckCheck size={14} className="text-gray-400 dark:text-gray-600"/>
                                    )}
                                </div>

                            </div>
                        ))
                    ) : (
                        <div
                            className="flex flex-col items-center justify-center pt-20 px-8 text-center text-gray-400">
                            <MessageSquare size={40} strokeWidth={1.5}
                                           className="mb-3 text-gray-300 dark:text-gray-600"/>
                            <p className="text-sm font-bold">Aucune discussion trouvée</p>
                            <p className="text-xs text-gray-400 mt-1">Essayez de modifier les termes de votre
                                recherche.</p>
                        </div>
                    )}
                </main>
            </div>
        </>
    )
}