import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import IonIcon from "@reacticons/ionicons";
import { missionService } from "../../api/services/missionService";
import { useFetch } from "../../hooks/useFetch";

export default function MissionDetail() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isApplying, setIsApplying] = useState(false);

    const userStatus = localStorage.getItem("status");

    const { data: mission, loading, error } = useFetch(
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
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="size-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (error || !mission) return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10 text-center">
            <IonIcon name="alert-circle" className="text-5xl text-red-500 mb-4" />
            <p className="font-black uppercase tracking-widest text-sm">Mission introuvable</p>
            <button onClick={() => navigate(-1)}
                className="mt-4 text-indigo-500 font-bold uppercase text-[10px] tracking-widest">
                Retour
            </button>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <header className="fixed top-0 left-0 w-full z-50 px-6 pt-12 flex justify-between items-center pointer-events-none">
                <button
                    onClick={() => navigate(-1)}
                    className="size-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center pointer-events-auto text-white shadow-lg"
                >
                    <IonIcon name="arrow-back" className="text-xl" />
                </button>
            </header>

            <div className="relative w-full h-[40vh] shrink-0 bg-indigo-600 flex items-end justify-start overflow-hidden">
                <span className="text-[50vw] font-[900] text-black/10 leading-[0.75] select-none tracking-tighter ml-[-2vw] mb-[-4vw]">
                    {mission?.utilisateur?.prenom?.charAt(0).toUpperCase()}
                    {mission?.utilisateur?.nom?.charAt(0).toUpperCase()}
                </span>
            </div>

            <main className="relative -mt-10 bg-white px-8 pt-10 pb-32 shadow-2xl flex flex-col gap-8">

                <section>
                    <h1 className="text-3xl font-black text-black uppercase tracking-tighter leading-tight">
                        {mission?.utilisateur?.prenom} {mission?.utilisateur?.nom}
                    </h1>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-2">
                        {mission.metier?.nom || "Général"} • {new Date(mission.date_offre).toLocaleDateString()}
                    </h2>
                </section>

                <hr className="border-black/10" />

                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-orange-500 font-black text-xs">01</span>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                            Description
                        </h2>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium">
                        {mission.description}
                    </p>

                    <div className="inline-flex items-center gap-2 border border-black/10 px-4 py-2 mt-6 rounded-xl">
                        <IonIcon name="location" className="text-black text-sm" />
                        <span className="text-[10px] font-black uppercase tracking-tight text-black">
                            {mission.localisation || "France"}
                        </span>
                    </div>
                </section>

                <hr className="border-black/10" />

                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-orange-500 font-black text-xs">02</span>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                            Images du chantier
                        </h2>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-black aspect-square flex flex-col items-center justify-center text-center p-2 rounded-sm">
                            <span className="text-orange-500 font-[900] text-2xl leading-none">09</span>
                            <span className="text-white text-[7px] font-black uppercase tracking-[0.1em] mt-1">Photos</span>
                        </div>

                        {[...Array(8)].map((_, i) => (
                            <>
                                <div key={i} className="aspect-square bg-gray-100 flex items-center justify-center border border-gray-100 rounded-sm">
                                    <IonIcon name="image-outline" className="text-gray-300 text-xl" />
                                </div>
                            </>
                        ))}
                    </div>
                </section>

                {(userStatus === "PRESTATAIRE" || userStatus === "ADMIN") && (
                    <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-white via-white to-transparent z-50">
                        <button
                            onClick={handleApply}
                            disabled={isApplying}
                            className={`w-full h-16 rounded-2xl font-[900] text-lg uppercase tracking-tighter transition-all active:scale-[0.98] shadow-xl flex items-center justify-center gap-3 ${isApplying
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-orange-500 text-black hover:bg-orange-400"
                                }`}
                        >
                            {isApplying ? (
                                <div className="size-5 border-2 border-t-transparent border-black rounded-full animate-spin" />
                            ) : (
                                "Demander un devis"
                            )}
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}