import { Outlet, useParams, useNavigate } from "react-router";
import { Header } from "../../components/navigation/Header.tsx";

const DISCUSSIONS = [
    {
        id: 1,
        name: "Lucas Bernard",
        lastMsg: "C'est parfait, à demain !",
        time: "10:45",
        unread: 2,
        img: "https://i.pravatar.cc/150?u=1"
    },
    {
        id: 2,
        name: "Marie Durand",
        lastMsg: "Pouvez-vous m'envoyer le brief ?",
        time: "Hier",
        unread: 0,
        img: "https://i.pravatar.cc/150?u=2"
    },
    {
        id: 3,
        name: "Jean Petit",
        lastMsg: "Merci beaucoup !",
        time: "Lun",
        unread: 0,
        img: "https://i.pravatar.cc/150?u=3"
    },
    {
        id: 4,
        name: "Sophie Martin",
        lastMsg: "Je suis en route pour la mission.",
        time: "Lun",
        unread: 0,
        img: "https://i.pravatar.cc/150?u=4"
    },
];

export default function Layout() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="flex h-screen bg-white dark:bg-neutral-950 overflow-hidden">
            <aside className={`w-full md:w-[400px] shrink-0 border-r border-gray-100 dark:border-white/5 flex flex-col ${id ? 'hidden md:flex' : 'flex'}`}>
                <Header title="Messages" showButton={false} />
                <div className="flex-1 overflow-y-auto px-6 space-y-3 pt-4">
                    {DISCUSSIONS.map((chat) => (
                        <button
                            key={chat.id}
                            onClick={() => navigate(`/message/${chat.id}`)}
                            className={`w-full p-4 rounded-[24px] flex items-center gap-4 transition-all ${parseInt(id ?? "") === chat.id ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-50 dark:bg-neutral-900'}`}
                        >
                            <img src={chat.img} className="size-10 rounded-xl object-cover" />
                            <span className="font-black uppercase text-[10px] truncate">{chat.name}</span>
                        </button>
                    ))}
                </div>
            </aside>

            <main className={`flex-1 flex flex-col relative ${!id ? 'hidden md:flex' : 'flex'}`}>
                <Outlet />
            </main>
        </div>
    );
}