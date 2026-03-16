import { useParams, useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import IonIcon from "@reacticons/ionicons";
import { getSocket } from "../../services/socketService";

interface Message {
  corps: string;
  id_expediteur: string;
  id_destinataire: string;
  lu?: boolean;
}

export default function ChatDetail() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const { id: contactId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const myId = localStorage.getItem("user_id") ?? "";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!contactId) return;

    const socket = getSocket();

    socket.emit("join_conversation", { contactId });

    socket.on("conversation_history", (history: Message[]) => {
      setMessages(history);
    });

    socket.on("new_message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Le contact a lu nos messages : on les marque tous comme lus localement
    socket.on("messages_read", ({ by }: { by: string }) => {
      if (by === contactId) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id_expediteur === myId ? { ...m, lu: true } : m
          )
        );
      }
    });

    return () => {
      socket.off("conversation_history");
      socket.off("new_message");
      socket.off("messages_read");
    };
  }, [contactId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim() || !contactId) return;
    const socket = getSocket();
    socket.emit("send_message", { contactId, corps: inputText });
    setInputText("");
  };

  return (
    <div className="h-full w-full bg-white dark:bg-[#0A0A0A] flex flex-col transition-colors duration-300">
      <>
        <header className="fixed top-0 left-0 w-full bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-md z-50 px-6 pt-12 pb-4 border-b border-gray-100 dark:border-white/5 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="size-10 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/5 rounded-xl flex items-center justify-center active:scale-90 transition-all"
          >
            <IonIcon
              name="chevron-back"
              className="text-xl text-black dark:text-white"
            />
          </button>
          <h1 className="text-sm font-black uppercase text-black dark:text-white">
            Utilisateur {contactId}
          </h1>
        </header>

        <main className="flex-1 px-6 pt-32 pb-32 overflow-y-auto flex flex-col scroll-smooth">
          {messages.map((msg, index) => {
            const isMe = msg.id_expediteur === myId;
            const prevMsg = messages[index - 1];
            const nextMsg = messages[index + 1];
            const isFirstInGroup =
              !prevMsg || prevMsg.id_expediteur !== msg.id_expediteur;
            const isLastInGroup =
              !nextMsg || nextMsg.id_expediteur !== msg.id_expediteur;
            const isMiddle = !isFirstInGroup && !isLastInGroup;

            return (
              <div
                key={index}
                className={`flex flex-col max-w-[80%] ${isMe ? "self-end items-end" : "items-start"} ${isFirstInGroup ? "mt-6" : "mt-0.5"}`}
              >
                <div
                  className={`px-4 py-2 text-[15px] font-medium leading-[1.3] transition-all duration-300 ${
                    isMe
                      ? `bg-black dark:bg-white text-white dark:text-black ${
                          isFirstInGroup && !isLastInGroup
                            ? "rounded-[22px] rounded-br-[4px]"
                            : isMiddle
                              ? "rounded-[22px] rounded-br-[4px] rounded-tr-[4px]"
                              : isLastInGroup && !isFirstInGroup
                                ? "rounded-[22px] rounded-tr-[4px]"
                                : "rounded-[22px] rounded-br-none"
                        }`
                      : `bg-gray-100 dark:bg-neutral-800 text-black dark:text-white ${
                          isFirstInGroup && !isLastInGroup
                            ? "rounded-[22px] rounded-bl-[4px]"
                            : isMiddle
                              ? "rounded-[22px] rounded-bl-[4px] rounded-tl-[4px]"
                              : isLastInGroup && !isFirstInGroup
                                ? "rounded-[22px] rounded-tl-[4px]"
                                : "rounded-[22px] rounded-bl-none"
                        }`
                  }`}
                >
                  <p>{msg.corps}</p>
                </div>

                {isLastInGroup && isMe && msg.lu && (
                  <span className="flex items-center mt-1 px-1">
                    <IonIcon
                      name="checkmark-done"
                      className="text-[13px] text-blue-500"
                    />
                  </span>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </main>

        <div className="w-full p-6 bg-white dark:bg-[#0A0A0A] border-t border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-[24px] p-2 pl-4 focus-within:ring-2 focus-within:ring-black dark:focus-within:ring-white transition-all">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Écrire..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm font-medium text-black dark:text-white dark:placeholder-neutral-500"
            />
            <button
              onClick={handleSendMessage}
              className="size-10 bg-black dark:bg-white text-white dark:text-black rounded-[18px] flex items-center justify-center active:scale-90 transition-all shadow-lg dark:shadow-none"
            >
              <IonIcon name="send" className="text-sm" />
            </button>
          </div>
        </div>
      </>
    </div>
  );
}
