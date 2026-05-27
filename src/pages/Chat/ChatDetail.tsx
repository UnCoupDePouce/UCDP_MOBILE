import HeaderChat from "../../components/Header/HeaderChat.tsx";
import React, {useEffect, useRef, useState} from "react";
import SkeletonChatDetail from "../../components/Skeleton/SkeletonChatDetail.tsx";
import {useLocation, useParams} from "react-router";
import {SendHorizonal} from "lucide-react";
import {SocketService} from "../../service/socket.service.ts";
import type {MessageItem} from "../../service/message.service.ts";
import {useUnreadMessages} from "../../provider/UnreadMessageProvider.tsx";

export default function ChatDetailPage() {
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState<MessageItem[]>([]);
    const [inputText, setInputText] = useState("");
    const [isContactTyping, setIsContactTyping] = useState(false);

    const {id: contactId} = useParams<{ id: string }>();
    const location = useLocation();
    const contact = location.state?.contact;
    const contactName: string = contact?.name ?? "Conversation";

    const myId = localStorage.getItem("user_id") ?? "";
    const bottomRef = useRef<HTMLDivElement>(null);
    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const {resetUnread} = useUnreadMessages();

    // Reset badge count when entering a conversation
    useEffect(() => {
        resetUnread();
    }, []);

    useEffect(() => {
        if (!contactId) return;

        const socket = SocketService.getSocket();

        // Full history when joining room
        const handleHistory = (history: MessageItem[]) => {
            setMessages(history);
            setLoading(false);
        };

        // New real-time message
        const handleNewMessage = (msg: MessageItem) => {
            const isThisConversation =
                (msg.id_expediteur === myId && msg.id_destinataire === contactId) ||
                (msg.id_expediteur === contactId && msg.id_destinataire === myId);

            if (!isThisConversation) return;

            setMessages((prev) => {
                if (msg.id_message != null && prev.some((m) => m.id_message === msg.id_message)) {
                    return prev;
                }
                return [...prev, msg];
            });
        };

        // Contact has read our messages
        const handleMessagesRead = ({by}: { by: string }) => {
            if (by === contactId) {
                setMessages((prev) =>
                    prev.map((m) =>
                        m.id_expediteur === myId ? {...m, lu: true} : m
                    )
                );
            }
        };

        // Contact typing indicator
        const handleTyping = ({userId, isTyping}: { userId: string; isTyping: boolean }) => {
            if (userId === contactId) {
                setIsContactTyping(isTyping);
            }
        };

        const handleError = (err: unknown) => {
            console.error("[Socket] Erreur reçue :", err);
            setLoading(false);
        };

        const handleConnectError = (err: Error) => {
            console.error("[Socket] Connexion échouée :", err.message);
        };

        socket.on("conversation_history", handleHistory);
        socket.on("new_message", handleNewMessage);
        socket.on("messages_read", handleMessagesRead);
        socket.on("typing", handleTyping);
        socket.on("error", handleError);
        socket.on("connect_error", handleConnectError);

        const joinRoom = () => {
            console.log("[Socket] connected, join_conversation →", contactId);
            socket.emit("join_conversation", {contactId});
        };

        if (socket.connected) {
            joinRoom();
        } else {
            console.log("[Socket] pas encore connecté, en attente...");
            socket.once("connect", joinRoom);
            if (!socket.active) {
                socket.connect();
            }
        }

        // Fallback — 20s for Render cold-start
        const timeout = setTimeout(() => {
            console.warn("[Socket] timeout — aucune réponse après 20s");
            setLoading(false);
        }, 20000);

        return () => {
            socket.off("conversation_history", handleHistory);
            socket.off("new_message", handleNewMessage);
            socket.off("messages_read", handleMessagesRead);
            socket.off("typing", handleTyping);
            socket.off("error", handleError);
            socket.off("connect_error", handleConnectError);
            socket.off("connect", joinRoom);
            clearTimeout(timeout);
            // Stop typing when leaving conversation
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        };
    }, [contactId, myId]);

    // Auto-scroll on new messages or typing indicator
    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages, isContactTyping]);

    const handleSendMessage = () => {
        if (!inputText.trim() || !contactId) return;
        const socket = SocketService.getSocket();
        // Stop typing before sending
        socket.emit("typing", {contactId, isTyping: false});
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        socket.emit("send_message", {contactId, corps: inputText.trim()});
        setInputText("");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
        if (!contactId) return;
        const socket = SocketService.getSocket();

        // Emit typing start
        socket.emit("typing", {contactId, isTyping: true});

        // Auto-stop typing after 2s of inactivity
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit("typing", {contactId, isTyping: false});
        }, 2000);
    };

    // Index of the last sent message that the contact has read
    const lastReadSentIndex = messages.reduce<number>((acc, msg, idx) => {
        if (msg.id_expediteur === myId && msg.lu) return idx;
        return acc;
    }, -1);

    return (
        <>
            <HeaderChat name={contactName} loading={loading}/>

            <div className="flex flex-col px-4 py-8 my-20 pb-28">
                {loading ? (
                    <SkeletonChatDetail/>
                ) : (
                    <div className="flex flex-col gap-4">
                        {messages.length === 0 ? (
                            <p className="text-center text-sm text-gray-400 mt-12">
                                Aucun message pour l'instant.<br/>
                                <span className="text-xs">Envoyez le premier message !</span>
                            </p>
                        ) : (
                            messages.map((msg, index) => {
                                const isMine = msg.id_expediteur === myId;
                                return (
                                    <div
                                        key={msg.id_message ?? `msg-${index}`}
                                        className={`chat ${isMine ? "chat-end" : "chat-start"}`}
                                    >
                                        <div className={`chat-bubble text-sm ${
                                            isMine
                                                ? "bg-orange-500 text-white"
                                                : "bg-base-200 text-base-content"
                                        }`}>
                                            {msg.corps}
                                        </div>
                                        {isMine && index === lastReadSentIndex && (
                                            <div className="chat-footer text-[10px] text-gray-400 mt-0.5">
                                                Vu ✓
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}

                        {/* Typing indicator bubbles */}
                        {isContactTyping && (
                            <div className="chat chat-start">
                                <div className="chat-bubble bg-base-200 text-base-content flex items-center gap-1.5 py-3 px-4 min-h-0">
                                    <span
                                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                        style={{animationDelay: "0ms"}}
                                    />
                                    <span
                                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                        style={{animationDelay: "150ms"}}
                                    />
                                    <span
                                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                        style={{animationDelay: "300ms"}}
                                    />
                                </div>
                            </div>
                        )}

                        <div ref={bottomRef}/>
                    </div>
                )}
            </div>

            <div className="fixed bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700 bg-base-100">
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-base-200 border border-gray-200 dark:border-gray-700/50 rounded-2xl px-2 pl-4 focus-within:border-orange-500 dark:focus-within:border-orange-500 transition-all">
                    <input
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Écrire..."
                        className="flex-1 bg-transparent border-none focus:outline-none text-sm font-medium text-gray-900 dark:text-white py-3"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputText.trim()}
                        className="w-9 h-9 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white rounded-xl flex items-center justify-center active:scale-95 transition-all shadow-md shadow-orange-500/10 shrink-0"
                        aria-label="Envoyer"
                    >
                        <SendHorizonal size={16}/>
                    </button>
                </div>
            </div>
        </>
    );
}
