import SelectedCategory from "../../../core/components/SelectedCategory";
import ProjectCard from "../../../core/components/cards/ProjectCard";
import { useNavigate } from "react-router";
import { useFetch } from "../../../core/hooks/useFetch.tsx";
import { missionService } from "../services/missionService.ts";
import IonIcon from "@reacticons/ionicons";
import type {Mission} from "../types/mission.ts";

export default function AllMission() {
    const navigate = useNavigate();

    const { data: missions, loading, error } = useFetch(
        () => missionService.getAll(),
        []
    );

    return (
        <div className="min-h-screen bg-neutral-50  transition-colors duration-500">
            <header className="fixed md:hidden top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 px-6 pt-12 pb-4 border-b border-gray-100  flex items-center gap-4">
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
                    Toutes les missions
                </h1>
            </header>

            <main className="px-6 pt-4 pb-32 max-w-2xl mx-auto">
                <div className="mb-8">
                    <SelectedCategory />
                </div>

                <div className="flex flex-col gap-y-5">
                    {loading ? (
                        [1, 2, 3].map((n) => (
                            <div key={n} className="w-full h-40 bg-white  rounded-[32px] animate-pulse border border-neutral-100" />
                        ))
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <IonIcon name="alert-circle-outline" className="text-4xl text-red-500 mb-2" />
                            <p className="text-xs font-black uppercase tracking-widest text-neutral-400">Erreur de chargement</p>
                        </div>
                    ) : missions && missions.length > 0 ? (
                        missions.map((m: Mission) => (
                            <ProjectCard
                                key={m.id_offre}
                                title={m.titre}
                                category={m.metier?.nom || "Besoin général"}
                                date={new Date(m.date_offre).toLocaleDateString()}
                                image={null}
                                infoLeft={m.localisation}
                                infoRight={`${m.utilisateur?.prenom || ''} ${m.utilisateur?.nom || 'Client'}`}
                                isAccepted={m.is_accepted}
                                onClick={() => navigate(`/mission/${m.id_offre}`)}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 opacity-40">
                            <IonIcon name="search-outline" className="text-5xl mb-4" />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Aucune mission disponible</p>
                        </div>
                    )}
                </div>

                {!loading && missions && missions.length > 5 && (
                    <div className="mt-10 flex justify-center">
                        <button className="text-[10px] font-black uppercase tracking-widest px-8 py-4 bg-white  rounded-full border border-neutral-200 active:scale-95 transition-all">
                            Charger plus
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}