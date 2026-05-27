import { useNavigate } from "react-router";
import { useRef } from "react";
import type { Candidate, Statut } from "../../model/candidate.ts";
import { CandidateService } from "../../service/candidate.service.ts";

interface CandidateCardProps {
  candidate: Candidate;
  allCandidatures?: Candidate[];
  onStatusChange: (idCandidature: number, newStatut: Statut) => void;
}

export default function CandidateCard({
  candidate,
  allCandidatures = [],
  onStatusChange,
}: CandidateCardProps) {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleMissionClick = () => {
    navigate(`/mission/${candidate.mission.id_offre}`, {
      state: { from: "/", name: candidate.mission.titre },
    });
  };

  const applicantsForThisMission = allCandidatures
    .filter((c) => {
      const currentCardOffreId = candidate.mission?.id_offre;
      const targetOffreId = c.mission?.id_offre;
      return (
        currentCardOffreId &&
        targetOffreId &&
        currentCardOffreId === targetOffreId
      );
    })
    .map((c) => {
      console.log("Objet candidature brut reçu de l'API :", c);

      const realCandidateId = c.id_candidature ?? (c as any).id;

      return {
        ...c.prestataire,
        id_candidature: realCandidateId,
        id_utilisateur: c.prestataire?.id_utilisateur,
        statut_candidature: c.statut,
        date_postulation: c.date_postulation,
      };
    });

  const navigateToUserProfile = (id: string) => {
    navigate(`/user/${id}`);
  };

  const handleValid = (idCandidature: number) => {
    CandidateService.valider(String(idCandidature))
      .then(() => {
        onStatusChange(idCandidature, "VALIDE" as Statut);
      })
      .catch((err) => console.error("Erreur validation:", err));
  };

  const handleDenied = (idCandidature: number) => {
    CandidateService.refuser(String(idCandidature))
      .then(() => {
        onStatusChange(idCandidature, "REFUSE" as Statut);
      })
      .catch((err) => console.error("Erreur refus:", err));
  };

  const isAlreadyAssigned = applicantsForThisMission.some(
    (app) => app.statut_candidature === "VALIDE",
  );

  return (
    <div className="flex flex-col gap-4 p-5 bg-base-200 border border-gray-100 dark:border-neutral-800 rounded-xl shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between w-full text-[10px]">
        <span
          className={`px-2.5 py-1 rounded-md font-black uppercase tracking-wider text-[9px] ${
            candidate?.statut === "VALIDE"
              ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
              : "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
          }`}
        >
          {candidate?.statut === "VALIDE" ? "Accepté" : "En cours"}
        </span>
        <span className="font-medium text-gray-400 dark:text-gray-500">
          Posté le{" "}
          {candidate?.mission?.date
            ? new Date(candidate?.mission?.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "Date inconnue"}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <span className="font-normal text-gray-400">
            Par {candidate?.client?.prenom}
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
        {candidate?.mission?.description}
      </p>

      <div className="h-px w-full bg-gray-100 dark:bg-neutral-800/60 my-1" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <button
          type="button"
          onClick={() => handleMissionClick()}
          className="inline-flex items-center justify-center px-3 py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all border border-gray-200 dark:border-neutral-700 bg-transparent text-gray-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-neutral-800 active:scale-95"
        >
          Voir l'annonce
        </button>
        {(role === "CLIENT" || role === "ADMIN") && (
          <button
            type="button"
            onClick={() => modalRef.current?.showModal()}
            className="inline-flex items-center justify-center px-3 py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all bg-orange-500 text-white shadow-sm hover:bg-orange-600 active:scale-95 cursor-pointer"
          >
            Consulter les candidatures ({applicantsForThisMission.length})
          </button>
        )}

        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-base-100 dark:bg-neutral-900 text-left rounded-t-2xl sm:rounded-2xl max-w-2xl h-[75vh] flex flex-col p-6">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
                ✕
              </button>
            </form>

            <div className="mb-4 pr-8">
              <h3 className="font-black text-xl text-gray-900 dark:text-white">
                Candidatures reçues
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Pour l'annonce : {candidate?.mission?.titre}
              </p>
            </div>

            <div className="flex-1 flex flex-col gap-3 overflow-y-auto no-scrollbar py-2 pr-1">
              {applicantsForThisMission.length > 0 ? (
                applicantsForThisMission.map((applicant) => (
                  <div
                    key={applicant.id_candidature}
                    className="flex flex-col gap-3 p-4 rounded-xl bg-slate-50 dark:bg-neutral-800/50 border border-gray-100 dark:border-neutral-800 transition-colors hover:border-gray-200 dark:hover:border-neutral-700"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <h4 className="text-sm font-black text-gray-900 dark:text-white">
                          {applicant.prenom} {applicant.nom?.toUpperCase()}
                        </h4>
                        <p className="text-xs text-gray-500 font-medium line-clamp-1">
                          {applicant.metier}
                        </p>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-md font-black uppercase tracking-wider text-[8px] ${
                          applicant.statut_candidature === "VALIDE"
                            ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                            : applicant.statut_candidature === "REFUSE"
                              ? "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                        }`}
                      >
                        {applicant.statut_candidature === "VALIDE"
                          ? "Choisi"
                          : applicant.statut_candidature === "REFUSE"
                            ? "Refusé"
                            : "En attente"}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 w-full pt-2 border-t border-gray-100 dark:border-neutral-800/60">
                      <button
                        type="button"
                        onClick={() =>
                          navigateToUserProfile(applicant.id_utilisateur)
                        }
                        className="inline-flex items-center justify-center px-2 py-2 rounded-lg text-[9px] font-extrabold uppercase tracking-wider transition-all border border-gray-200 dark:border-neutral-700 bg-transparent text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-neutral-800"
                      >
                        Profil
                      </button>

                      {applicant.statut_candidature === "EN_ATTENTE" &&
                      !isAlreadyAssigned ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              handleDenied(applicant.id_candidature)
                            }
                            className="inline-flex items-center justify-center px-2 py-2 rounded-lg text-[9px] font-extrabold uppercase tracking-wider transition-all border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30"
                          >
                            Refuser
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleValid(applicant.id_candidature)
                            }
                            className="inline-flex items-center justify-center px-2 py-2 rounded-lg text-[9px] font-extrabold uppercase tracking-wider transition-all bg-green-600 text-white shadow-sm hover:bg-green-700"
                          >
                            Valider
                          </button>
                        </>
                      ) : (
                        <div className="col-span-2 flex items-center justify-center text-[10px] text-gray-400 italic font-medium bg-gray-50 dark:bg-neutral-800/20 rounded-lg">
                          {applicant.statut_candidature === "VALIDE"
                            ? "Candidat retenu 🎉"
                            : isAlreadyAssigned
                              ? "Offre pourvue"
                              : `Candidature ${applicant.statut_candidature.toLowerCase()}`}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-6 text-xs text-gray-400">
                  <p>Aucun profil n'a encore postulé à cette offre.</p>
                </div>
              )}
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
}
