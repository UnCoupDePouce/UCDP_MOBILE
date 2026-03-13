import { useState } from "react";
import IonIcon from "@reacticons/ionicons";

const MOCK_PROS = [
    { id: 1, name: "Jean Maçon", job: "Expert Gros Œuvre", rating: "4.9", price: "450€", img: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Lucas Elec", job: "Électricien certifié", rating: "4.7", price: "420€", img: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "BTP Services", job: "Entreprise Générale", rating: "4.5", price: "500€", img: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Marc Plomberie", job: "Plombier Chauffagiste", rating: "4.8", price: "380€", img: "https://i.pravatar.cc/150?u=4" },
];

export default function MyMission() {
    const [selectedMission, setSelectedMission] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
            <main className="flex-1 overflow-y-auto px-6 pt-12 pb-32">
                <header className="mb-10">
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-black dark:text-white leading-none">
                        Mes Missions
                    </h1>
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-3">
                        Gérer vos demandes en cours
                    </p>
                </header>

                <div className="flex flex-col gap-4">
                    <MissionItem
                        title="Réparation fuite évier"
                        status="4 Pros ont postulé"
                        date="21 Janv."
                        isActive={selectedMission === "1"}
                        onClick={() => setSelectedMission(selectedMission === "1" ? null : "1")}
                    />

                    <MissionItem
                        title="Pose de carrelage 20m2"
                        status="En attente de réponses"
                        date="19 Janv."
                        isActive={selectedMission === "2"}
                        onClick={() => setSelectedMission(selectedMission === "2" ? null : "2")}
                    />
                </div>
            </main>

            {/* Panel des Professionnels (Drawer) */}
            {selectedMission === "1" && (
                <div className="fixed inset-0 z-[100] flex items-end">
                    <div
                        className="absolute inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setSelectedMission(null)}
                    />

                    <div className="relative bg-white dark:bg-[#121212] w-full rounded-t-[40px] px-8 pt-4 pb-12 animate-in slide-in-from-bottom-full duration-500 shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.3)] border-t dark:border-white/5">
                        <div className="w-12 h-1.5 bg-gray-200 dark:bg-neutral-800 rounded-full mx-auto mb-8" />

                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter text-black dark:text-white">Candidatures</h3>
                                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Sélectionnez votre artisan</p>
                            </div>
                            <button
                                onClick={() => setSelectedMission(null)}
                                className="size-10 bg-gray-50 dark:bg-neutral-900 rounded-full flex items-center justify-center active:scale-90 transition-all border border-gray-100 dark:border-white/5"
                            >
                                <IonIcon name="close" className="text-xl dark:text-white" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
                            {MOCK_PROS.map((pro) => (
                                <ProCard key={pro.id} pro={pro} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function MissionItem({ title, status, date, isActive, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`w-full p-6 rounded-[32px] border-2 text-left transition-all active:scale-[0.98] 
            ${isActive
                ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-2xl shadow-black/20'
                : 'border-gray-100 bg-gray-50 text-black dark:border-neutral-900 dark:bg-neutral-900/50 dark:text-white'}`}
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`size-12 rounded-2xl flex items-center justify-center 
                    ${isActive
                    ? 'bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/10'
                    : 'bg-white dark:bg-neutral-800 shadow-sm'}`}>
                    <IonIcon name="construct" className={`text-xl ${isActive ? 'text-white dark:text-black' : 'text-black dark:text-white'}`} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-white/40 dark:text-black/40' : 'text-gray-300 dark:text-neutral-600'}`}>{date}</span>
            </div>
            <h2 className="text-xl font-black uppercase tracking-tighter mb-1 truncate">{title}</h2>
            <div className="flex items-center gap-2">
                <div className={`size-1.5 rounded-full ${isActive ? 'bg-green-400' : 'bg-black dark:bg-white'} animate-pulse`} />
                <p className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-white/60 dark:text-black/60' : 'text-gray-400 dark:text-neutral-500'}`}>
                    {status}
                </p>
            </div>
        </button>
    );
}

function ProCard({ pro }: any) {
    return (
        <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-white/5 p-4 rounded-[30px] shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <div className="size-16 shrink-0 rounded-[22px] overflow-hidden border border-gray-50 dark:border-neutral-800 shadow-inner">
                    <img src={pro.img} className="w-full h-full object-cover" alt={pro.name} />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-black text-sm uppercase tracking-tight text-black dark:text-white truncate">{pro.name}</h4>
                        <div className="flex items-center gap-0.5 bg-yellow-400/10 px-1.5 py-0.5 rounded-md">
                            <IonIcon name="star" className="text-yellow-500 text-[8px]" />
                            <span className="text-[9px] font-black text-yellow-600">{pro.rating}</span>
                        </div>
                    </div>
                    <p className="text-[9px] font-black text-gray-400 dark:text-neutral-500 uppercase tracking-widest mb-2">{pro.job}</p>
                    <span className="text-[11px] font-black text-black dark:text-white italic">Proposition : {pro.price}</span>
                </div>
            </div>

            <div className="flex gap-2">
                <button className="flex-1 h-12 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all shadow-lg">
                    Accepter
                </button>
                <button className="size-12 bg-gray-100 dark:bg-neutral-800 text-black dark:text-white rounded-2xl flex items-center justify-center active:scale-95 transition-all">
                    <IonIcon name="chatbubble-ellipses" className="text-xl" />
                </button>
            </div>
        </div>
    );
}