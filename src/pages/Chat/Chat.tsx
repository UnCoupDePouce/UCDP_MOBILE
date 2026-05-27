import {CheckCheck, MessageSquare} from "lucide-react";
import Header from "../../components/Header/Header.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {MessageService, type Conversation} from "../../service/message.service.ts";

export default function ChatPage() {
    const navigate = useNavigate();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        MessageService.getConversations()
            .then(setConversations)
            .catch((err) => console.error("Erreur chargement conversations:", err))
            .finally(() => setLoading(false));
    }, []);

    const handleChatClick = (conv: Conversation) => {
        navigate(`/chat/${conv.contact_id}`, {
            state: {
                contact: {
                    id: conv.contact_id,
                    name: `${conv.prenom} ${conv.nom}`,
                },
                from: "/chat",
            },
        });
    };

    return (
        <>
            <div className="w-full mx-auto h-screen flex flex-col">
                <Header name={"Messages"}/>
                <main className="flex-1 mt-20 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800/60">

                    {loading ? (
                        // Skeleton
                        Array.from({length: 4}).map((_, i) => (
                            <div key={i} className="flex items-start gap-3 p-4">
                                <div className="skeleton w-12 h-12 rounded-xl shrink-0"/>
                                <div className="flex-1 flex flex-col gap-2">
                                    <div className="skeleton h-3 w-1/3 rounded"/>
                                    <div className="skeleton h-3 w-2/3 rounded"/>
                                </div>
                            </div>
                        ))
                    ) : conversations.length > 0 ? (
                        conversations.map((conv) => (
                            <div
                                key={conv.contact_id}
                                onClick={() => handleChatClick(conv)}
                                className="flex items-start gap-3 p-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/40"
                            >
                                {/* Avatar initiales */}
                                <div className="relative shrink-0">
                                    <div className="w-12 h-12 rounded-xl bg-base-200 font-black flex items-center justify-center text-sm tracking-tighter">
                                        {conv.prenom?.[0]?.toUpperCase()}{conv.nom?.[0]?.toUpperCase()}
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline justify-between mb-0.5">
                                        <h2 className="text-sm font-bold truncate">
                                            {conv.prenom} {conv.nom}
                                        </h2>
                                    </div>
                                    <p className="text-xs leading-relaxed truncate pr-2 text-gray-500 dark:text-gray-400">
                                        {conv.last_message || "Aucun message"}
                                    </p>
                                </div>

                                <div className="flex flex-col items-end justify-center h-10 shrink-0">
                                    <CheckCheck size={14} className="text-gray-400 dark:text-gray-600"/>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-20 px-8 text-center text-gray-400">
                            <MessageSquare size={40} strokeWidth={1.5} className="mb-3 text-gray-300 dark:text-gray-600"/>
                            <p className="text-sm font-bold">Aucune discussion</p>
                            <p className="text-xs text-gray-400 mt-1">
                                Postule à une annonce pour démarrer une conversation.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
