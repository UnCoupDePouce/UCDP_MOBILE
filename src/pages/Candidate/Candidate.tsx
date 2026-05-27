import { useEffect, useState } from "react";
import Header from "../../components/Header/Header.tsx";
import Layout from "../../Layout/Layout.tsx";
import SkeletonCandidate from "../../components/Skeleton/SkeletonCandidate.tsx";
import CandidateCard from "../../components/Card/CandidateCard.tsx";
import { CandidateService } from "../../service/candidate.service.ts";
import type { Candidate, Statut } from "../../model/candidate.ts";

export default function Candidate() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tous");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    const fetchPromise = CandidateService.getMine();
    const timer = setTimeout(() => {
      fetchPromise
        .then((data) => {
          setCandidates(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erreur chargement candidatures :", err);
          setLoading(false);
        });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const getButtonClass = (tabName: string) => {
    const isSelected = activeTab === tabName;
    return `inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border whitespace-nowrap leading-none ${
      isSelected
        ? "bg-orange-500 text-white border-orange-500 shadow-sm"
        : "bg-slate-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300"
    }`;
  };

  const getBadgeClass = (tabName: string) => {
    const isSelected = activeTab === tabName;
    return `inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] rounded-md font-bold transition-all leading-none h-4 ${
      isSelected
        ? "bg-white text-orange-600"
        : "bg-gray-200 dark:bg-neutral-700 text-gray-600 dark:text-gray-400"
    }`;
  };

  const cartesMissionsUniques = candidates.filter(
    (candidature, index, tableId) =>
      tableId.findIndex(
        (c) => c.mission.id_offre === candidature.mission.id_offre,
      ) === index,
  );

  const counts = {
    tous: cartesMissionsUniques.length,
    accepte: cartesMissionsUniques.filter((c) => c.statut === "VALIDE").length,
    enCours: cartesMissionsUniques.filter((c) => c.statut === "EN_ATTENTE")
      .length,
    refuse: cartesMissionsUniques.filter((c) => c.statut === "REFUSE").length,
  };

  const candidatesFiltres = cartesMissionsUniques.filter((cand) => {
    if (activeTab === "tous") return true;
    if (activeTab === "accepte") return cand.statut === "VALIDE";
    if (activeTab === "enCours") return cand.statut === "EN_ATTENTE";
    if (activeTab === "refuse") return cand.statut === "REFUSE";
    return true;
  });

  const updateCandidateStatus = (idCandidature: number, newStatut: Statut) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id_candidature === idCandidature ? { ...c, statut: newStatut } : c,
      ),
    );
  };

  return (
    <>
      <Header name={"Mes candidatures"} />
      <Layout>
        <div className="flex flex-row items-center gap-2 w-full mb-6 overflow-x-auto no-scrollbar scroll-smooth px-2">
          <button
            type="button"
            onClick={() => setActiveTab("tous")}
            className={getButtonClass("tous")}
          >
            <span>Tous</span>
            <span className={getBadgeClass("tous")}>{counts.tous}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("accepte")}
            className={getButtonClass("accepte")}
          >
            <span>Accepté</span>
            <span className={getBadgeClass("accepte")}>{counts.accepte}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("enCours")}
            className={getButtonClass("enCours")}
          >
            <span>En cours d'acceptation</span>
            <span className={getBadgeClass("enCours")}>{counts.enCours}</span>
          </button>
          {role != "CLIENT" && (
            <button
              type="button"
              onClick={() => setActiveTab("refuse")}
              className={getButtonClass("refuse")}
            >
              <span>Refusé</span>
              <span className={getBadgeClass("refuse")}>{counts.refuse}</span>
            </button>
          )}
        </div>

        {loading ? (
          <SkeletonCandidate />
        ) : (
          <div>
            <div className="flex flex-col gap-8">
              {candidatesFiltres.length > 0 ? (
                candidatesFiltres.map((cand) => (
                  <CandidateCard
                    key={cand.id_candidature}
                    candidate={cand}
                    allCandidatures={candidates}
                    onStatusChange={updateCandidateStatus}
                  />
                ))
              ) : (
                <p className="text-center text-sm text-gray-400 py-8">
                  Aucune candidature dans cette catégorie.
                </p>
              )}
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}
