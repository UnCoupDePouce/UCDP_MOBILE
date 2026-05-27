import HomeHeader from "../../components/Header/HomeHeader.tsx";
import {useEffect, useState} from "react";
import SkeletonHomePage from "../../components/Skeleton/SkeletonHomePage.tsx";
import {Link, useNavigate} from "react-router";
import {MissionService} from "../../service/mission.service.ts";
import type {Mission} from "../../model/mission.ts";

export default function HomePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");

    const [missions, setMissions] = useState<Mission[]>([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);

        MissionService.getAll()
            .then((data) => {
                console.log("Mission chargée :", data);
                setMissions(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erreur lors du chargement de la mission :", err);
                setLoading(false);
            });
    }, []);

    const handleMissionClick = (mission: Mission) => {
        navigate(`/mission/${mission.id_offre}`, {
            state: {from: "/", name: mission?.utilisateur?.prenom + mission?.utilisateur?.nom}
        });
    };

    return (
        <>
            <div className="flex flex-col px-4 py-8 mb-20">
                <HomeHeader/>
                {loading ? (
                    <>
                        <SkeletonHomePage/>
                    </>
                ) : (
                    <div>
                        <div className="flex flex-col gap-12">

                            <div className="flex flex-col gap-2 w-3/4">
                                <h1 className="font-black text-3xl uppercase leading-tight">
                                    <span className="text-orange-500">{name}</span>, <br/>

                                    {role === "CLIENT"
                                        ? "QUE CRÉONS-NOUS"
                                        : "QUE RÉPARONS-NOUS"}{" "}
                                    <br/>
                                    AUJOURD'HUI ?
                                </h1>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="text-sm text-gray-600 flex justify-between">
                                    <span>Missions à proximité</span>
                                    <Link to="/search" className="link link-primary">Voir tout</Link>
                                </div>
                                {missions.length === 0 ? (
                                    <div
                                        className="flex flex-col items-center justify-center p-8 bg-base-200 rounded-md text-center border border-dashed border-gray-300 dark:border-zinc-700">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Aucune mission n'est disponible pour le moment.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        {missions.slice(0, 10).map((mission) => (
                                            <div
                                                key={mission.id_offre}
                                                onClick={() => handleMissionClick(mission)}

                                                className="flex flex-col gap-2 bg-base-200 p-2 pb-6 rounded-sm cursor-pointer transition-all active:scale-[0.98] hover:bg-base-300"
                                            >
                                            
                                            <span className="font-medium text-[11px] text-gray-400 dark:text-gray-500">
                Posté le {
                                                mission?.date_offre
                                                    ? new Date(mission.date_offre).toLocaleDateString("fr-FR", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric"
                                                    })
                                                    : "Date inconnue"
                                            }
            </span>
                                                {mission.image && mission.image.length > 0 ? (
                                                    <img
                                                        src={mission.image[0]}
                                                        alt={mission.titre || "Aperçu de la mission"}
                                                        loading="lazy"
                                                        className="h-32 w-full rounded-md object-cover"
                                                    />
                                                ) : (
                                                    <img
                                                        src="src/assets/generic_image.jpg"
                                                        alt="generic image"
                                                        loading="lazy"
                                                        className="h-32 w-full rounded-md object-cover"
                                                    />
                                                )}
                                                <p className="font-medium text-sm mt-1">
                                                    {mission?.utilisateur?.prenom} {mission?.utilisateur?.nom}
                                                </p>

                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {mission?.metier?.nom || "Métier non spécifié"} · {mission?.localisation}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </>
    )
}