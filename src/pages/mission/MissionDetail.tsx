import {useState} from "react";
import {useNavigate, useParams} from "react-router";
import IonIcon from "@reacticons/ionicons";
import {missionService} from "../../services/missionService.ts";
import {useFetch} from "../../hooks/useFetch.tsx";

export default function MissionDetail() {
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isApplying, setIsApplying] = useState(false);

    const userStatus = localStorage.getItem("status");

    const {data: mission, loading, error} = useFetch(
        () => missionService.getById(id || ""),
        [id]
    );

    const handleApply = async () => {
        setIsApplying(true);

        try {
            const response = await fetch("/local/api/candidatures/apply", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("hasToken")}`
                },
                body: JSON.stringify({
                    id_offre: mission?.id_offre,
                    id_client: mission?.id_utilisateur,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Félicitations ! Votre candidature a été transmise.");
            } else {
                alert(data.message || "Erreur lors de la postulation");
            }
        } catch (error) {
            console.error(error);
            alert("Impossible de joindre le serveur.");
        } finally {
            setIsApplying(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
            <div className="size-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"/>
        </div>
    );

    if (error || !mission) return (
        <div
            className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-10 text-center">
            <IonIcon name="alert-circle" className="text-5xl text-red-500 mb-4"/>
            <p className="font-black uppercase tracking-widest dark:text-white text-sm">Mission introuvable</p>
            <button onClick={() => navigate(-1)}
                    className="mt-4 text-indigo-500 font-bold uppercase text-[10px] tracking-widest">Retour
            </button>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
            <header
                className="fixed top-0 left-0 w-full z-50 px-6 pt-12 flex justify-between items-center pointer-events-none">
                <button
                    onClick={() => navigate(-1)}
                    className="size-12 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-gray-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center active:scale-90 transition-all shadow-lg pointer-events-auto text-black dark:text-white"
                >
                    <IonIcon name="chevron-back" className="text-2xl"/>
                </button>

                <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="size-12 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-gray-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center shadow-lg pointer-events-auto active:scale-90 transition-all"
                >
                    <IonIcon
                        name={isFavorite ? "heart" : "heart-outline"}
                        className={`text-xl transition-colors ${isFavorite ? "text-red-500" : "text-black dark:text-white"}`}
                    />
                </button>
            </header>

            {/* Hero Image */}
            <div className="relative w-full h-[40vh] shrink-0 bg-gray-200 dark:bg-zinc-800">
                <img
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800"
                    className="w-full h-full object-cover"
                    alt={mission.titre}
                />
                <div
                    className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white dark:to-zinc-900"/>
            </div>

            {/* Main Content - flex-grow-1 pour prendre toute la place restante */}
            <main
                className="relative -mt-10 flex-grow bg-white dark:bg-zinc-900 rounded-t-[40px] px-8 pt-10 pb-10 shadow-2xl transition-colors duration-300 flex flex-col">
                <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-[0.2em]">
                            {mission.metier?.nom || "Général"} • {new Date(mission.date_offre).toLocaleDateString()}
                        </p>
                    </div>

                    <h1 className="text-3xl font-black text-black dark:text-white uppercase tracking-tighter leading-tight mb-6">
                        {mission.titre}
                    </h1>

                    <div className="flex flex-wrap gap-3 mb-8">
                        <div
                            className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/50 px-4 py-2.5 rounded-2xl">
                            <IonIcon name="location" className="text-black dark:text-zinc-400 text-sm"/>
                            <span className="text-[10px] font-black uppercase tracking-tight dark:text-zinc-200">
                  {mission.localisation || "France"}
                </span>
                        </div>
                        <div
                            className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/50 px-4 py-2.5 rounded-2xl">
                            <IonIcon name="person" className="text-black dark:text-zinc-400 text-sm"/>
                            <span className="text-[10px] font-black uppercase tracking-tight dark:text-zinc-200">
                  {`${mission.utilisateur?.prenom} ${mission.utilisateur?.nom}`}
                </span>
                        </div>
                    </div>

                    <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-400 dark:text-zinc-500 mb-4">
                        Description
                    </h3>
                    <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed font-medium mb-12">
                        {mission.description}
                    </p>
                </div>

                {(userStatus === "PRESTATAIRE"|| userStatus === "ADMIN") && (
                    <div className="mt-auto pt-10">
                        <button
                            onClick={handleApply}
                            disabled={isApplying}
                            className={`
        w-full h-16 rounded-2xl font-black uppercase text-[13px] tracking-[0.2em] transition-all active:scale-[0.98]
        flex items-center justify-center gap-3 shadow-xl
        ${isApplying
                                ? "bg-gray-300 dark:bg-zinc-800 cursor-not-allowed opacity-70"
                                : "bg-black dark:bg-white text-white dark:text-black hover:opacity-90"}
      `}
                        >
                            {isApplying ? (
                                <div
                                    className="size-5 border-2 border-t-transparent border-white dark:border-black rounded-full animate-spin"/>
                            ) : (
                                <>
                                    Postuler
                                    <IonIcon name="flash" className="text-lg text-yellow-500"/>
                                </>
                            )}
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}