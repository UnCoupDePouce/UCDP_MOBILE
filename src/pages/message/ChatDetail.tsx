import { useParams, useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import IonIcon from "@reacticons/ionicons";
import { useFetch } from "../../hooks/useFetch";
import { userService } from "../../api/services/userService";
import { getSocket } from "../../api/services/socket";

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

    socket.on("messages_read", ({ by }: { by: string }) => {
      if (by === contactId) {
        setMessages((prev) =>
          prev.map((m) => (m.id_expediteur === myId ? { ...m, lu: true } : m)),
        );
      }
    });

    return () => {
      socket.off("conversation_history");
      socket.off("new_message");
      socket.off("messages_read");
    };
  }, [contactId, myId]);

  const { data: user } = useFetch(
    () => userService.getById(contactId || ""),
    [contactId],
  );

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
    <div className="h-full w-full flex flex-col transition-colors duration-300">
      <>
        <header className="fixed md:hidden top-0 left-0 w-full border-b border-gray-400 bg-white backdrop-blur-md z-50 px-6 pt-4 pb-2 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="size-10 bg-gray-50  border border-gray-200  rounded-xl flex items-center justify-center active:scale-90 transition-all"
          >
            <IonIcon
              name="chevron-back"
              className="text-xl text-black "
            />
          </button>
          <h1 className="text-sm font-black uppercase text-black ">
            {user ? `${user.prenom} ${user.nom}` : "Chargement..."}
          </h1>
        </header>

        <main className="flex-1 px-6 pt-24 pb-32 overflow-y-auto flex flex-col scroll-smooth">
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
                  className={`px-4 py-2 text-[15px] font-medium leading-[1.3] transition-all duration-300 ${isMe
                      ? `bg-black text-white  ${isFirstInGroup && !isLastInGroup
                        ? "rounded-[22px] rounded-br-[4px]"
                        : isMiddle
                          ? "rounded-[22px] rounded-br-[4px] rounded-tr-[4px]"
                          : isLastInGroup && !isFirstInGroup
                            ? "rounded-[22px] rounded-tr-[4px]"
                            : "rounded-[22px] rounded-br-none"
                      }`
                      : `bg-orange-300 text-black  ${isFirstInGroup && !isLastInGroup
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

        <div className="w-full p-2 border-t border-gray-400 ">
          <div className="flex items-center gap-3 bg-gray-50  border border-gray-200  rounded-[24px] px-2 pl-4 focus-within:ring-2 focus-within:ring-black transition-all">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Écrire..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm font-medium text-black "
            />
            <button
              onClick={handleSendMessage}
              className="size-8 m-1 bg-black text-white  rounded-[18px] flex items-center justify-center active:scale-90 transition-all shadow-lg"
            >
              <IonIcon name="send" className="text-sm" />
            </button>
          </div>
        </div>
      </>
    </div>
  );
}
