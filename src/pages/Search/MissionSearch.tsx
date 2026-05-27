import SkeletonSearch from "../../components/Skeleton/SkeletonSearch.tsx";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header.tsx";
import {MissionService} from "../../service/mission.service.ts";
import type {Mission} from "../../model/mission.ts";
import {useNavigate} from "react-router";

export default function MissionSearchPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    MissionService.getAll()
        .then((data) => {
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
      state: {
        from: "/",
        name: mission?.utilisateur?.prenom + mission?.utilisateur?.nom,
      },
    });
  };

  return (
    <>
      <Header name={"Recherche"} />
      <div className="flex flex-col px-4 py-8 my-20">
        <div className="flex flex-col gap-6 mb-8">
          <label className="input flex items-center gap-2 w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </g>
            </svg>
            <input type="search" className="grow" placeholder="Rechercher" />
          </label>

          <select className="select w-full">
            <option value="default" disabled selected>
              Sélectionner un métier
            </option>
            <option value="ebeniste">Ébéniste</option>
            <option value="plombier">Plombier</option>
            <option value="electricien">Électricien</option>
          </select>
        </div>

        {loading ? (
          <>
            <SkeletonSearch />
          </>
        ) : (
            <div className="flex flex-col gap-4">
              {missions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 bg-base-200 rounded-md text-center border border-dashed border-gray-300 dark:border-zinc-700">
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
                          Posté le{" "}
                          {mission?.date_offre
                              ? new Date(mission.date_offre).toLocaleDateString(
                                  "fr-FR",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  },
                              )
                              : "Date inconnue"}
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
                                  src={`src/assets/generic_image_${
                                      ([...mission.id_offre].reduce(
                                          (acc, char) => acc + char.charCodeAt(0),
                                          0
                                      ) % 4) + 1
                                  }.webp`}
                                  alt="generic image"
                                  loading="lazy"
                                  className="h-32 w-full rounded-md object-cover"
                              />
                          )}
                          <p className="font-medium text-sm mt-1">
                            {mission?.utilisateur?.prenom}{" "}
                            {mission?.utilisateur?.nom}
                          </p>

                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {mission?.metier?.nom || "Métier non spécifié"} ·{" "}
                            {mission?.localisation}
                          </p>
                        </div>
                    ))}
                  </div>
              )}
          </div>
        )}
      </div>
    </>
  );
}
