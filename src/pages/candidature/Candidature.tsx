import { useNavigate } from "react-router";
import IonIcon from "@reacticons/ionicons";
import { useFetch } from "../../hooks/useFetch.tsx";
import { candidatureService } from "../../services/candidatureService.ts";
import { useSocket } from "../../providers/socketProvider.tsx";
import {Header} from "../../components/navigation/Header.tsx";

export default function Candidatures() {
    const navigate = useNavigate();
    const { socket } = useSocket();

    const { data: candidatures, loading } = useFetch(
        () => candidatureService.getMine(),
        []
    );

    const handleAction = (item: any) => {
        if (socket) {
            socket.emit("join_chat_offre", { id_offre: item.id_offre });
        }
        navigate(`/mission/${item.id_offre}`);
    };

    const getStatusStyle = (statut: string) => {
        switch (statut) {
            case "VALIDE": return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-200";
            case "REFUSE": return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200";
            default: return "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200";
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center dark:bg-neutral-950">
            <div className="size-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 pb-24 transition-colors duration-300">
            <Header title="Mes candidatures" showButton={false} className="md:hidden" />

            <main className="px-6 space-y-4">
                {candidatures?.length === 0 ? (
                    <div className="py-20 text-center opacity-50">
                        <IonIcon name="document-text-outline" className="text-5xl mb-4 dark:text-white" />
                        <p className="font-black uppercase text-[10px] tracking-widest dark:text-white">Aucune candidature</p>
                    </div>
                ) : (
                    candidatures?.map((item: any) => (
                        <div
                            key={item.id_candidature}
                            onClick={() => handleAction(item)}
                            className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-gray-100 dark:border-zinc-800 shadow-xl shadow-black/5 active:scale-[0.96] transition-all cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg border uppercase tracking-wider ${getStatusStyle(item.statut)}`}>
                                        {item.statut.replace('_', ' ')}
                                    </span>
                                    <h2 className="text-lg font-black dark:text-white mt-3 leading-tight uppercase tracking-tight">
                                        {item.titre}
                                    </h2>
                                </div>
                                <p className="text-xl font-black italic dark:text-white ml-2">{item.prix}€</p>
                            </div>

                            {/* Section Client - Plus discrète mais complète */}
                            <div className="flex items-center gap-3 pt-4 border-t border-gray-50 dark:border-zinc-800/50">
                                <img
                                    src={`https://api.dicebear.com/8.x/initials/svg?seed=${item.client_prenom}`}
                                    className="size-8 rounded-full bg-gray-100 dark:bg-zinc-800"
                                    alt="Client"
                                />
                                <div className="flex-1">
                                    <p className="text-[10px] font-black dark:text-white uppercase leading-none">
                                        {item.client_prenom} {item.client_nom}
                                    </p>
                                    <div className="flex items-center gap-1 text-gray-400 mt-1">
                                        <IonIcon name="location" className="text-[10px]" />
                                        <span className="text-[9px] font-bold uppercase tracking-tighter">{item.localisation}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">
                                        {new Date(item.date_postulation).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
}