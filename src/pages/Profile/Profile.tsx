import {
  Briefcase,
  Calendar,
  FileCheck,
  FileText,
  LogOut,
  Mail,
  MapPin,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import Header from "../../components/Header/Header.tsx";
import Layout from "../../Layout/Layout.tsx";
import { useEffect, useState } from "react";
import type { Utilisateur } from "../../model/user.ts";
import { UserService } from "../../service/user.service.ts";

export default function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("user_id");
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<Utilisateur>();

  useEffect(() => {
    if (!id) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    UserService.getById(id)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement de l'utilisateur :", err);
        setLoading(false);
      });
  }, []);

  const handleDeconnexion = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("hasToken");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      <Header name={"Profil"} />
      <Layout>
        <div>
          <div className="flex flex-col gap-12">
            {loading ? (
              <></>
            ) : (
              <div className="card p-6">
                <div className="flex flex-col items-center text-center pb-12">
                  <h1 className="text-xl font-black uppercase tracking-tighter">
                    {user?.prenom?.toUpperCase()} {user?.nom?.toUpperCase()}
                  </h1>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                      {role}
                    </span>
                    <ShieldCheck size={14} className="text-indigo-500" />
                  </div>
                </div>

                <hr className="my-5 border-gray-100 dark:border-gray-800" />

                <div className="space-y-3 text-sm">
                  {role === "PRESTATAIRE" && (
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <Briefcase size={16} className="text-gray-400" />
                      <span>{user?.raison_sociale}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Mail size={16} className="text-gray-400" />
                    <span>{user?.mail}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{user?.ville}, France</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Calendar size={16} className="text-gray-400" />
                    <span>
                      Membre depuis{" "}
                      {user?.date_creation
                        ? new Intl.DateTimeFormat("fr-FR", {
                            month: "long",
                            year: "numeric",
                          }).format(new Date(user.date_creation))
                        : "..."}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-2">
                Réglages du compte
              </h2>

              <div className="bg-white dark:bg-[#1d232a] rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden">
                <button
                  disabled={true}
                  className="w-full flex items-center justify-between p-4 text-left text-sm font-semibold transition-colors
                                    bg-transparent text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/40 disabled:bg-gray-100 dark:disabled:bg-neutral-800
                                    disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <User
                      size={18}
                      className="text-indigo-500 group-disabled:text-gray-400"
                    />
                    <span>Modifier mes informations</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>

                <hr className="border-gray-100 dark:border-gray-800" />

                <button
                  onClick={() =>
                    navigate("/settings", {
                      state: { from: location.pathname },
                    })
                  }
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors text-left text-sm font-semibold"
                >
                  <div className="flex items-center gap-3">
                    <Settings size={18} className="text-purple-500" />
                    <span>Paramètres de l'application</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-2">
                Documents légaux
              </h2>

              <div className="bg-white dark:bg-[#1d232a] rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden">
                <button
                  onClick={() =>
                    navigate("/legal/terms", {
                      state: { from: location.pathname },
                    })
                  }
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors text-left text-sm font-semibold"
                >
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-amber-500" />
                    <span>Conditions Générales de Vente (CGV)</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>

                <hr className="border-gray-100 dark:border-gray-800" />

                <button
                  onClick={() =>
                    navigate("/legal/rgpd", {
                      state: { from: location.pathname },
                    })
                  }
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors text-left text-sm font-semibold"
                >
                  <div className="flex items-center gap-3">
                    <FileCheck size={18} className="text-emerald-500" />
                    <span>Politique de confidentialité (RGPD)</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleDeconnexion}
              className="btn btn-soft btn-error w-full h-12 rounded-xl font-bold uppercase text-xs tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <LogOut size={16} />
              <span>Se déconnecter</span>
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
