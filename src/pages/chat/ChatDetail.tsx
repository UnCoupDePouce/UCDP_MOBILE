import { useParams, useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import IonIcon from "@reacticons/ionicons";

export default function ChatDetail() {
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([
        { id: 1, text: "Bonjour ! Est-elle toujours disponible ?", sender: "other", time: "10:45" },
        { id: 2, text: "Oui absolument !", sender: "me", time: "10:46" },
    ]);

    const { id } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputText.trim()) return;
        const newMessage = {
            id: Date.now(),
            text: inputText,
            sender: "me",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, newMessage]);
        setInputText("");
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const newMessage = {
                id: Date.now(),
                text: "",
                image: imageUrl,
                sender: "me",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, newMessage]);
        }
    };

    return (
        <div className="h-full w-full bg-white dark:bg-[#0A0A0A] flex flex-col transition-colors duration-300">

                <>
                    {/* Header avec flou adapté */}
                    <header className="fixed top-0 left-0 w-full bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-md z-50 px-6 pt-12 pb-4 border-b border-gray-100 dark:border-white/5 flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="size-10 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/5 rounded-xl flex items-center justify-center active:scale-90 transition-all">
                            <IonIcon name="chevron-back" className="text-xl text-black dark:text-white" />
                        </button>
                        <h1 className="text-sm font-black uppercase text-black dark:text-white">Utilisateur {id}</h1>
                    </header>

                    <main className="flex-1 px-6 pt-32 pb-32 overflow-y-auto flex flex-col scroll-smooth">
                        {messages.map((msg, index) => {
                            const isMe = msg.sender === "me";
                            const prevMsg = messages[index - 1];
                            const nextMsg = messages[index + 1];
                            const isFirstInGroup = !prevMsg || prevMsg.sender !== msg.sender;
                            const isLastInGroup = !nextMsg || nextMsg.sender !== msg.sender;
                            const isMiddle = !isFirstInGroup && !isLastInGroup;

                            return (
                                <div key={msg.id} className={`flex flex-col max-w-[80%] ${isMe ? "self-end items-end" : "items-start"} ${isFirstInGroup ? "mt-6" : "mt-0.5"}`}>
                                    <div className={`px-4 py-2 text-[15px] font-medium leading-[1.3] transition-all duration-300 ${
                                        isMe
                                            ? `bg-black dark:bg-white text-white dark:text-black ${
                                                isFirstInGroup && !isLastInGroup ? "rounded-[22px] rounded-br-[4px]" :
                                                    isMiddle ? "rounded-[22px] rounded-br-[4px] rounded-tr-[4px]" :
                                                        isLastInGroup && !isFirstInGroup ? "rounded-[22px] rounded-tr-[4px]" : "rounded-[22px] rounded-br-none"
                                            }`
                                            : `bg-gray-100 dark:bg-neutral-800 text-black dark:text-white ${
                                                isFirstInGroup && !isLastInGroup ? "rounded-[22px] rounded-bl-[4px]" :
                                                    isMiddle ? "rounded-[22px] rounded-bl-[4px] rounded-tl-[4px]" :
                                                        isLastInGroup && !isFirstInGroup ? "rounded-[22px] rounded-tl-[4px]" : "rounded-[22px] rounded-bl-none"
                                            }`
                                    }`}>
                                        {/* {msg.image && <img src={msg.image} className="rounded-lg max-h-64 w-full object-cover mb-1 border dark:border-white/10" onLoad={scrollToBottom} />} */}
                                        {msg.text && <p>{msg.text}</p>}
                                    </div>
                                    {isLastInGroup && (
                                        <span className="text-[8px] font-black text-gray-400 dark:text-neutral-500 uppercase mt-1 px-2 tracking-widest">
                                            {msg.time} {isMe && "• Lu"}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </main>

                    <div className="w-full p-6 bg-white dark:bg-[#0A0A0A] border-t border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-[24px] p-2 pl-4 focus-within:ring-2 focus-within:ring-black dark:focus-within:ring-white transition-all">
                            <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageUpload} />
                            <button onClick={() => fileInputRef.current?.click()} className="size-10 text-gray-400 dark:text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                                <IonIcon name="image-outline" className="text-xl" />
                            </button>
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