import HeaderMissionDetail from "../../components/Header/HeaderMissionDetail.tsx";
import { MapPin, User } from "lucide-react";
import { useEffect, useState } from "react";
import SkeletonMissionDetail from "../../components/Skeleton/SkeletonMissionDetail.tsx";
import { MissionService } from "../../service/mission.service.ts";
import type { Mission } from "../../model/mission.ts";
import { Link, useNavigate, useParams } from "react-router";
import { CandidateService } from "../../service/candidate.service.ts";

export default function DetailMissionPage() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const [mission, setMission] = useState<Mission | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [alreadyApplying, setAlreadyApplying] = useState(false);
  const { id } = useParams<{ id: string }>();
  const id_utilisateur = localStorage.getItem("user_id");

  useEffect(() => {
    if (!id) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    const fetchMission = MissionService.getById(id);
    const fetchCandidature = CandidateService.getMine();

    const timer = setTimeout(() => {
      fetchMission
        .then((data) => {
          console.log("Mission chargée :", data);
          setMission(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erreur lors du chargement de la mission :", err);
          setLoading(false);
        });
    }, 1000);

    fetchCandidature
      .then((data) => {
        console.log("Deja apply à cette mission:", data);
        const hasAlreadyApplied = data.some(
          (candidature: any) => candidature.mission?.id_offre === id,
        );
        setAlreadyApplying(hasAlreadyApplied);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement de la mission :", err);
        setAlreadyApplying(false);
      });

    return () => clearTimeout(timer);
  }, [id]);

  const handleApply = () => {
    const idClientProprietaire =
      mission?.utilisateur?.id_utilisateur || mission?.id_utilisateur;

    if (!id || !idClientProprietaire || !id_utilisateur) {
      return;
    }

    setIsApplying(true);

    CandidateService.apply(id, idClientProprietaire)
      .then((response) => {
        console.log("Candidature envoyée avec succès !", response);
        navigate(`/chat/${idClientProprietaire}`, {
          state: {
            contact: {
              id: idClientProprietaire,
              name: `${mission?.utilisateur?.prenom || ""} ${mission?.utilisateur?.nom || ""}`.trim(),
            },
            from: `/mission/${id}`,
          },
        });
      })
      .catch((err) => {
        console.error("Erreur lors de la postulation :", err);
        alert("Une erreur est survenue lors de l'envoi de votre candidature.");
      })
      .finally(() => {
        setIsApplying(false);
      });
  };

  return (
    <>
      <HeaderMissionDetail
        name={
          `${mission?.utilisateur?.prenom || ""} ${mission?.utilisateur?.nom || ""}`.trim() ||
          "Détail"
        }
        loading={loading}
      />
      {loading ? (
        <SkeletonMissionDetail />
      ) : (
        <>
          <div className="relative w-full h-[40vh] shrink-0 bg-indigo-600 flex items-end justify-start overflow-hidden">
            <span className="text-[50vw] font-black text-black/10 leading-[0.75] select-none tracking-tighter ml-[-2vw] mb-[-4vw]">
              {`${mission?.utilisateur?.nom?.split(" ")[0]?.[0] || ""}${mission?.utilisateur?.prenom?.split(" ")[0]?.[0] || ""}`.toUpperCase()}{" "}
            </span>
          </div>

          <main className="relative px-8 pt-10 pb-50 h-full shadow-2xl flex flex-col gap-8">
            <section>
              <div className="flex flex-row gap-2">
                <h1 className="text-3xl font-black uppercase tracking-tighter leading-tight">
                  {mission?.titre}
                </h1>
              </div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-2">
                {mission?.metier?.nom || "Métier non spécifié"} •{" "}
                {mission?.date_offre
                  ? new Date(mission.date_offre).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Date inconnue"}
              </h2>
            </section>

            <hr className="border-black/10" />

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-orange-500 font-black text-xs">01</span>
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Description
                </h2>
              </div>

              <div className="space-y-3">
                <p className="text-sm leading-relaxed">
                  {mission?.description}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-500">
                <div className="inline-flex items-center gap-1.5">
                  <MapPin size={14} className="text-orange-500" />
                  <span className="text-[10px] font-black uppercase tracking-wide ">
                    {mission?.localisation || "France"}, France
                  </span>
                </div>

                <span className="text-gray-300 text-xs select-none">•</span>

                <Link
                  to={`/user/${mission?.utilisateur?.id_utilisateur}`}
                  className="inline-flex items-center gap-1.5 group cursor-pointer transition-all active:scale-95"
                >
                  <User
                    size={14}
                    className="text-orange-500 transition-colors group-hover:text-orange-500"
                  />
                  <span className="text-[10px] font-black uppercase tracking-wide transition-colors underline group-hover:text-orange-500">
                    {mission?.utilisateur?.prenom} {mission?.utilisateur?.nom}
                  </span>
                </Link>
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

              <div>
                {mission?.image && mission.image.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-black aspect-square flex flex-col items-center justify-center text-center p-2 rounded-sm">
                      <span className="text-orange-500 font-black text-2xl leading-none">
                        {String(mission.image.length).padStart(2, "0")}
                      </span>
                      <span className="text-white text-[7px] font-black uppercase tracking-widest mt-1">
                        Photos
                      </span>
                    </div>

                    {mission.image.map((imgUrl, i) => (
                      <div
                        key={i}
                        className="aspect-square bg-gray-100 border border-gray-100 rounded-sm overflow-hidden"
                      >
                        <img
                          src={imgUrl}
                          alt={`Chantier ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed text-gray-400">
                    Aucune photo pour ce chantier.
                  </p>
                )}
              </div>
            </section>

            {(role === "PRESTATAIRE" || role === "ADMIN") &&
              !mission?.statut &&
              !alreadyApplying && (
                <div className="flex items-center gap-3 fixed bottom-0 left-0 w-full px-4 py-8 z-50 border-t bg-base-100 border-gray-200 dark:border-gray-700">
                  <button
                    disabled
                    className="btn btn-soft btn-info whitespace-nowrap"
                  >
                    Est. : {mission?.prix} €
                  </button>
                  <button
                    onClick={handleApply}
                    disabled={isApplying}
                    className="btn btn-soft btn-warning flex-1 font-black uppercase text-xs sm:text-sm tracking-wide transition-all active:scale-95"
                  >
                    {isApplying ? "Envoi..." : "Contacter l'annonceur"}
                  </button>
                </div>
              )}
          </main>
        </>
      )}
    </>
  );
}
