import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Mail, Phone, Shield } from "lucide-react";
import type { Utilisateur } from "../../model/user.ts";
import HeaderNameArrow from "../../components/Header/HeaderNameArrow.tsx";
import { UserService } from "../../service/user.service.ts";

export default function DetailProfile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<Utilisateur | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    const fetchPromise = UserService.getById(id);

    const timer = setTimeout(() => {
      fetchPromise
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erreur lors du chargement de l'utilisateur :", err);
          setLoading(false);
        });
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  return (
    <>
      <HeaderNameArrow
        name={
          loading
            ? "Détail du profil"
            : `${user?.prenom || ""} ${user?.nom || ""}`.trim()
        }
      />

      {loading ? (
        <div className="animate-pulse space-y-8 p-8 my-20">
          <div className="w-full h-[30vh] bg-gray-200 dark:bg-neutral-800 rounded-sm" />
          <div className="h-8 bg-gray-200 dark:bg-neutral-800 rounded w-1/2" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-5/6" />
          </div>
        </div>
      ) : (
        <>
          <main className="relative px-8 pt-10 my-20 flex flex-col gap-8 select-none">
            <section>
              <h1 className="text-3xl font-black uppercase tracking-tighter leading-tight">
                {user?.prenom} {user?.nom}
              </h1>
              <div className="flex items-center gap-1.5 mt-2 text-gray-400">
                <Shield size={14} className="text-orange-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  {user?.role || "Membre"}
                </span>
              </div>
            </section>

            <hr className="border-black/10 dark:border-white/10" />

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-orange-500 font-black text-xs">01</span>
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Informations de contact
                </h2>
              </div>

              <div className="space-y-3 pt-2">
                {user?.mail && (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={16} className="text-gray-400" />
                    <a
                      href={`mailto:${user.mail}`}
                      className="font-medium text-neutral-700 dark:text-neutral-300 active:text-orange-500"
                    >
                      {user.mail}
                    </a>
                  </div>
                )}

                {user?.telephone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={16} className="text-gray-400" />
                    <a
                      href={`tel:${user.telephone}`}
                      className="font-medium text-neutral-700 dark:text-neutral-300 active:text-orange-500"
                    >
                      {user.telephone}
                    </a>
                  </div>
                )}
              </div>
            </section>

            <hr className="border-black/10 dark:border-white/10" />

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-orange-500 font-black text-xs">02</span>
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Activité
                </h2>
              </div>
              <p className="text-xs text-gray-400 italic">
                Aucune autre activité publique pour le moment.
              </p>
            </section>
          </main>
        </>
      )}
    </>
  );
}
