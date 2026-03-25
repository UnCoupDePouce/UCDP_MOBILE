import { HomeHeader } from "../components/navigation/HomeHeader.tsx";
import SelectedCategory from "../components/SelectedCategory.tsx";
import { useNavigate } from "react-router";
import ProjectCard from "../components/cards/ProjectCard.tsx";
import {useFetch} from "../hooks/useFetch.tsx";
import {missionService} from "../services/missionService.ts";
import type { Mission } from "../types/mission.ts";

export default function Accueil() {
  const navigate = useNavigate();

  const { data: missions, loading } = useFetch(
      () => missionService.getAll(),
      []
  );

  return (
      <main className="min-h-screen bg-neutral-50 dark:bg-black transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 pb-28">
          <div className="py-4 md:py-8">
            <HomeHeader />
          </div>

          <div className="mb-10">
            <SelectedCategory />
          </div>

          <div className="flex flex-col gap-y-6">
            <div className="flex justify-between items-end px-1">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-neutral-600">
                Missions à proximité
              </h2>
              <button
                  onClick={() => navigate("/missions")}
                  className="text-[10px] font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-600 transition-colors"
              >
                Voir tout
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? (
                  [1, 2, 3, 4].map((n) => (
                      <div key={n} className="w-full h-44 bg-white dark:bg-neutral-900 rounded-[32px] animate-pulse border border-neutral-100 dark:border-neutral-800" />
                  ))
              ) : missions && missions.length > 0 ? (
                  missions.slice(0, 4).map((m: Mission) => (
                      <ProjectCard
                          key={m.id_offre}
                          title={m.titre}
                          category={m.metier.nom}
                          date={new Date(m.date_offre).toLocaleDateString()}
                          image={null}
                          infoLeft={m.localisation}
                          infoRight={`${m.utilisateur.prenom} ${m.utilisateur.nom}`}
                          onClick={() => navigate(`/mission/${m.id_offre}`)}
                      />
                  ))
              ) : (
                  <div className="col-span-full py-10 text-center opacity-40">
                    <p className="text-[10px] font-black uppercase tracking-widest">Aucune mission disponible</p>
                  </div>
              )}
            </div>
          </div>
        </div>
      </main>
  );
}
