import { useEffect, useState } from "react";
import IonIcon from "@reacticons/ionicons";
import { candidatureService } from "../../candidatures/services/candidatureService";

type Candidature = {
  id_candidature: number;
  id_prestataire: string;
  statut: "EN_ATTENTE" | "VALIDE" | "REFUSE";
  date_postulation: string;
  id_offre: string;
  titre: string;
  prix: number;
  localisation: string;
  presta_id: string;
  presta_prenom: string;
  presta_nom: string;
};

type MissionGroup = {
  id_offre: string;
  titre: string;
  localisation: string;
  candidatures: Candidature[];
};

interface MissionItemProps {
  title: string;
  status: string;
  isActive: boolean;
  onClick: () => void;
}

export default function MyMission() {
  const [missions, setMissions] = useState<MissionGroup[]>([]);
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    candidatureService
      .getByClient()
      .then((rows: Candidature[]) => {
        // Grouper par offre
        const map = new Map<string, MissionGroup>();
        for (const row of rows) {
          if (!map.has(row.id_offre)) {
            map.set(row.id_offre, {
              id_offre: row.id_offre,
              titre: row.titre,
              localisation: row.localisation,
              candidatures: [],
            });
          }
          map.get(row.id_offre)!.candidatures.push(row);
        }
        setMissions(Array.from(map.values()));
      })
      .catch(() => setError("Impossible de charger vos missions."))
      .finally(() => setLoading(false));
  }, []);

  const handleValider = async (id_candidature: number) => {
    setValidating(id_candidature);
    try {
      await candidatureService.valider(id_candidature);
      // Mettre à jour le statut localement
      setMissions((prev) =>
        prev.map((m) => ({
          ...m,
          candidatures: m.candidatures.map((c) =>
            c.id_candidature === id_candidature ? { ...c, statut: "VALIDE" } : c
          ),
        }))
      );
    } catch {
      setError("Erreur lors de la validation.");
    } finally {
      setValidating(null);
    }
  };

  const selectedGroup = missions.find((m) => m.id_offre === selectedMission);

  return (
    <div className="min-h-screen bg-white  transition-colors duration-300">
      <main className="flex-1 overflow-y-auto px-6 pt-12 pb-32">
        <header className="mb-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-black  leading-none">
            Mes Missions
          </h1>
          <p className="text-[10px] font-black text-gray-400  uppercase tracking-widest mt-3">
            Gérer vos demandes en cours
          </p>
        </header>

        {error && (
          <p className="text-red-500 text-xs font-black uppercase tracking-widest mb-6">
            {error}
          </p>
        )}

        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-32 rounded-[32px] bg-gray-100  animate-pulse"
              />
            ))}
          </div>
        ) : missions.length === 0 ? (
          <p className="text-center text-gray-400  text-xs font-black uppercase tracking-widest mt-20">
            Aucune mission publiée
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {missions.map((mission) => {
              const enAttente = mission.candidatures.filter(
                (c) => c.statut === "EN_ATTENTE"
              ).length;
              const status =
                enAttente > 0
                  ? `${enAttente} candidature${enAttente > 1 ? "s" : ""} en attente`
                  : "Aucune candidature en attente";

              return (
                <MissionItem
                  key={mission.id_offre}
                  title={mission.titre}
                  status={status}
                  isActive={selectedMission === mission.id_offre}
                  onClick={() =>
                    setSelectedMission(
                      selectedMission === mission.id_offre ? null : mission.id_offre
                    )
                  }
                />
              );
            })}
          </div>
        )}
      </main>

      {selectedGroup && (
        <div className="fixed inset-0 z-[100] flex items-end">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedMission(null)}
          />

          <div className="relative bg-white  w-full rounded-t-[40px] px-8 pt-4 pb-12 animate-in slide-in-from-bottom-full duration-500 shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.3)] border-t">
            <div className="w-12 h-1.5 bg-gray-200  rounded-full mx-auto mb-8" />

            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-black ">
                  Candidatures
                </h3>
                <p className="text-[10px] font-black text-gray-400  uppercase tracking-widest mt-1">
                  {selectedGroup.titre}
                </p>
              </div>
              <button
                onClick={() => setSelectedMission(null)}
                className="size-10 bg-gray-50  rounded-full flex items-center justify-center active:scale-90 transition-all border border-gray-100"
              >
                <IonIcon name="close" className="text-xl " />
              </button>
            </div>

            {selectedGroup.candidatures.length === 0 ? (
              <p className="text-center text-gray-400 text-xs font-black uppercase tracking-widest py-10">
                Aucune candidature reçue
              </p>
            ) : (
              <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
                {selectedGroup.candidatures.map((c) => (
                  <ProCard
                    key={c.id_candidature}
                    candidature={c}
                    isValidating={validating === c.id_candidature}
                    onValider={() => handleValider(c.id_candidature)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MissionItem({ title, status, isActive, onClick }: MissionItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-6 rounded-[32px] border-2 text-left transition-all active:scale-[0.98]
        ${
          isActive
            ? "border-black bg-black text-white    shadow-2xl shadow-black/20"
            : "border-gray-100 bg-gray-50 text-black"
        }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div
          className={`size-12 rounded-2xl flex items-center justify-center
            ${
              isActive
                ? "bg-white/10 border border-white/20"
                : "bg-white  shadow-sm"
            }`}
        >
          <IonIcon
            name="construct"
            className={`text-xl ${isActive ? "text-white " : "text-black "}`}
          />
        </div>
      </div>
      <h2 className="text-xl font-black uppercase tracking-tighter mb-1 truncate">
        {title}
      </h2>
      <div className="flex items-center gap-2">
        <div
          className={`size-1.5 rounded-full ${isActive ? "bg-green-400" : "bg-black "} animate-pulse`}
        />
        <p
          className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "text-white/60 /60" : "text-gray-400"}`}
        >
          {status}
        </p>
      </div>
    </button>
  );
}

function ProCard({
  candidature,
  isValidating,
  onValider,
}: {
  candidature: Candidature;
  isValidating: boolean;
  onValider: () => void;
}) {
  const isValide = candidature.statut === "VALIDE";

  return (
    <div className="bg-white  border border-gray-100 /5 p-4 rounded-[30px] shadow-sm flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="size-16 shrink-0 rounded-[22px] bg-gray-100  flex items-center justify-center border border-gray-50">
          <IonIcon name="person" className="text-2xl text-gray-400 " />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-black text-sm uppercase tracking-tight text-black  truncate">
            {candidature.presta_prenom} {candidature.presta_nom}
          </h4>
          <p className="text-[9px] font-black text-gray-400  uppercase tracking-widest mt-0.5">
            Postulé le{" "}
            {new Date(candidature.date_postulation).toLocaleDateString("fr-FR")}
          </p>
        </div>

        {isValide && (
          <div className="flex items-center gap-1 bg-green-400/10 px-2 py-1 rounded-xl">
            <IonIcon name="checkmark-circle" className="text-green-500 text-sm" />
            <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">
              Validé
            </span>
          </div>
        )}
      </div>

      {!isValide && (
        <div className="flex gap-2">
          <button
            onClick={onValider}
            disabled={isValidating}
            className="flex-1 h-12 bg-black  text-white  rounded-2xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:scale-100"
          >
            {isValidating ? "..." : "Accepter"}
          </button>
        </div>
      )}
    </div>
  );
}
