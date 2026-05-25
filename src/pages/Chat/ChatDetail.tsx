import HeaderChat from "../../components/Header/HeaderChat.tsx";
import {useEffect, useState} from "react";
import SkeletonChatDetail from "../../components/Skeleton/SkeletonChatDetail.tsx";
import {useParams} from "react-router";
import {SendHorizonal} from "lucide-react";

export default function ChatDetailPage() {
    const [loading, setLoading] = useState(true);
    const [inputText, setInputText] = useState("");
    const {id: contactId} = useParams<{ id: string }>();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleSendMessage = () => {
        if (!inputText.trim() || !contactId) return;
        setInputText("");
    };

    return (
        <>
            <HeaderChat name={"Thomas Zabalo"} loading={loading}/>

            <div className="flex flex-col px-4 py-8 my-20">
                {loading ? (
                    <>
                        <SkeletonChatDetail/>
                    </>
                ) : (
                    <div>
                        <div className="flex flex-col gap-6">
                            <div className="chat chat-start">
                                <div className="chat-bubble">
                                    It's over Anakin,
                                    <br/>
                                    I have the high ground.
                                </div>
                            </div>
                            <div className="chat chat-end">
                                <div className="chat-bubble chat-bubble-info bg-orange-500 text-white">Calm down,
                                    Anakin.
                                </div>
                            </div>
                            <div className="chat chat-start">
                                <div className="chat-bubble">
                                    It's over Anakin,
                                    <br/>
                                    I have the high ground.
                                </div>
                            </div>
                            <div className="chat chat-end">
                                <div className="chat-bubble chat-bubble-info bg-orange-500 text-white">Calm down,
                                    Anakin.
                                </div>
                            </div>
                            <div className="chat chat-start">
                                <div className="chat-bubble">
                                    It's over Anakin,
                                    <br/>
                                    I have the high ground.
                                </div>
                            </div>
                            <div className="chat chat-end">
                                <div className="chat-bubble chat-bubble-info bg-orange-500 text-white">Calm down,
                                    Anakin.
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div
                className="fixed bottom-0 w-full p-4 border-t border-gray-500 bg-base-100">
                <div
                    className="flex items-center gap-3 bg-slate-50 border border-gray-200 dark:border-gray-700/50 rounded-2xl px-2 pl-4 focus-within:border-orange-500 dark:focus-within:border-orange-500 transition-all">

                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Écrire..."
                        className="flex-1 bg-transparent border-none focus:outline-none text-sm font-medium text-gray-900 py-3"
                    />

                    <button
                        onClick={handleSendMessage}
                        className="w-9 h-9 bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex items-center justify-center active:scale-95 transition-all shadow-md shadow-orange-500/10 shrink-0"
                        aria-label="Envoyer"
                    >
                        <SendHorizonal size={16}/>
                    </button>

                </div>
            </div>
        </>
    )
}
