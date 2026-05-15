import { useHome } from "./useHome.ts";
import ProjectCard from "../../components/ProjectCard.tsx";
import { HomeHeader } from "../../components/HomeHeader.tsx";
import { useFetch } from "../../hooks/useFetch.ts";
import { userService } from "../../api/services/userService.ts";
import IonIcon from "@reacticons/ionicons";

export default function Home() {
  const { missions, loading, goToMissions, goToMissionDetail } = useHome();
  const id = localStorage.getItem("user_id");
  const { data: user } = useFetch(() => userService.getById(id || ""), [id]);

  const categories = [
    { name: "Plomberie", icon: "water-outline" },
    { name: "Électricité", icon: "flash-outline" },
    { name: "Peinture", icon: "brush-outline" },
    { name: "Maçonnerie", icon: "construct-outline" },
    { name: "Plomberie", icon: "water-outline" },
    { name: "Électricité", icon: "flash-outline" },
    { name: "Peinture", icon: "brush-outline" },
    { name: "Maçonnerie", icon: "construct-outline" },
    { name: "Plomberie", icon: "water-outline" },
    { name: "Électricité", icon: "flash-outline" },
    { name: "Peinture", icon: "brush-outline" },
    { name: "Maçonnerie", icon: "construct-outline" },
  ];

  return (
    <div className="px-4 py-4 mb-12">
      <HomeHeader />

      <div className="flex items-center gap-1 mb-6">
        <IonIcon name="map" className="text-orange-500 text-sm" />
        <span className="text-[11px] font-bold text-gray-900 uppercase">{user?.ville}</span>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-4 flex items-center">
          <IonIcon name="search-outline" className="text-xl text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Fuite, peinture, dépannage..."
          className="w-full bg-white shadow-sm border border-gray-50 rounded-full py-3 pl-12 pr-14 text-sm font-medium focus:outline-none"
        />
      </div>

      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-orange-500 font-black text-xs">01</span>
          <h2 className="font-black uppercase text-xs tracking-widest text-gray-400">Par métier</h2>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((cat) => (
            <div key={cat.name} className="bg-white p-3 flex flex-col items-center gap-2 shadow-sm border border-gray-50">
              <IonIcon name={cat.icon as any} className="text-orange-500 text-xl" />
              <span className="text-[9px] font-black uppercase text-center leading-tight">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-y-2 mb-10">
        <div className="flex items-center gap-1 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-orange-500 font-black text-xs">02</span>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              Missions à proximité
            </h2>
          </div>
          <button onClick={goToMissions} className="text-[11px] text-gray-400 underline ml-auto">Voir tout</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            [1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="skeleton w-full h-44 bg-gray-100"
              />
            ))
          ) : missions && missions.length > 0 ? (
            missions
              .slice(0, 4)
              .map((m) => (
                <ProjectCard
                  key={m.id_offre}
                  title={m.titre}
                  category={m.metier?.nom || "Mission générale"}
                  date={new Date(m.date_offre).toLocaleDateString()}
                  image={null}
                  infoLeft={m.localisation}
                  infoRight={`${m.utilisateur.prenom} ${m.utilisateur.nom}`}
                  isAccepted={m.is_accepted}
                  onClick={() => goToMissionDetail(m.id_offre)}
                />
              ))
          ) : (
            <div className="col-span-full py-10 text-center opacity-40">
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral">
                Aucune mission disponible
              </p>
            </div>
          )}
        </div>
      </section>
    </div>

  );
}
