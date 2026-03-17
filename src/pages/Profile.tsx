import { useState, useCallback, useEffect } from "react";
import { Header } from "../components/navigation/Header.tsx";
import { useTheme } from "../providers/ThemeProvider.tsx";
import { useFetch } from "../hooks/useFetch.tsx";
import { userService } from "../services/userService.ts";
import { useMemo } from "react";
import IonIcon from "@reacticons/ionicons";
import { Role } from "../types/user";

export default function Profile() {
  const [isProMode, setIsProMode] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const isDark = theme === "dark";
  const id_user = localStorage.getItem("user_id");
  const role = localStorage.getItem("status");
  const isAdmin = role === Role.ADMIN;
  const isPrestataire = role === Role.PRESTATAIRE;

  const {
    data: user,
    loading,
    error,
  } = useFetch(() => userService.getById(id_user || ""), [id_user]);

  const displayName = useMemo(() => {
    return user?.nom && user?.prenom
      ? `${user.prenom} ${user.nom}`
      : "Utilisateur";
  }, [user]);

  const initials = useMemo(() => {
    const first = user?.prenom?.[0] || "";
    const last = user?.nom?.[0] || "";
    return (first + last).toUpperCase() || "?";
  }, [user]);

  const handleLogout = () => {
    userService.logout();
  };

  useEffect(() => {
    if (isPrestataire && !isAdmin) {
      setIsProMode(true);
    }
  }, [isPrestataire, isAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-black flex items-center justify-center">
        <div className="relative size-16">
          <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error || !id_user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-black p-10 text-center">
        <div className="space-y-4">
          <IonIcon
            name="alert-circle-outline"
            className="text-5xl text-red-500"
          />
          <p className="text-sm font-black uppercase tracking-tighter text-neutral-800 dark:text-neutral-200">
            Session expirée ou introuvable
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="text-[10px] font-bold uppercase tracking-widest text-indigo-500"
          >
            Retour au login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
      <Header title="Mon Profil" />

      <main className="px-6 py-4 pb-32">
        <div className="mb-6 flex justify-end">
          <button
            onClick={toggleTheme}
            className="relative w-14 h-8 bg-gray-100 dark:bg-neutral-800 rounded-full p-1 border border-gray-200 dark:border-neutral-700"
          >
            <div
              className={`absolute top-1 left-1 size-6 rounded-full bg-white dark:bg-neutral-950 shadow-sm flex items-center justify-center transition-transform duration-300 ${isDark ? "translate-x-6" : "translate-x-0"}`}
            >
              <IonIcon
                name={isDark ? "moon" : "sunny"}
                className={isDark ? "text-indigo-400" : "text-amber-500"}
                style={{ fontSize: "14px" }}
              />
            </div>
          </button>
        </div>

        {isAdmin && (
          <div className="mb-10 bg-gray-100 dark:bg-neutral-900 p-1.5 rounded-[24px] flex items-center relative h-14 border border-neutral-200 dark:border-neutral-800">
            <div
              className={`absolute h-[44px] w-[calc(50%-6px)] bg-black dark:bg-white rounded-[18px] transition-transform duration-300 ease-out ${isProMode ? "translate-x-[calc(100%+0px)]" : "translate-x-0"}`}
            />
            <button
              onClick={() => setIsProMode(false)}
              className={`flex-1 relative z-10 text-[10px] font-black uppercase tracking-widest transition-colors ${!isProMode ? "text-white dark:text-black" : "text-gray-400"}`}
            >
              Vue Client
            </button>
            <button
              onClick={() => setIsProMode(true)}
              className={`flex-1 relative z-10 text-[10px] font-black uppercase tracking-widest transition-colors ${isProMode ? "text-white dark:text-black" : "text-gray-400"}`}
            >
              Vue Pro
            </button>
          </div>
        )}

        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <div className="size-28 rounded-[32px] overflow-hidden border border-gray-100 dark:border-neutral-800 p-1.5 bg-gray-50 dark:bg-neutral-900 shadow-sm flex items-center justify-center text-3xl font-black text-black dark:text-white">
              {initials}
            </div>
            <button className="absolute -bottom-2 -right-2 bg-black dark:bg-white text-white dark:text-black size-10 rounded-2xl shadow-xl flex items-center justify-center border-4 border-white dark:border-neutral-950 active:scale-90 transition-all">
              <IonIcon name="camera" style={{ fontSize: "18px" }} />
            </button>
          </div>
          <h2 className="mt-6 text-2xl font-black text-black dark:text-white uppercase tracking-tighter text-center">
            {displayName}
          </h2>
          <p className="text-[10px] font-black text-gray-400 dark:text-neutral-500 uppercase tracking-[0.2em] mt-1">
            {isProMode ? user?.raison_sociale : "Client Particulier"}
          </p>
        </div>

        <div className="flex flex-col gap-y-3">
          <h3 className="text-[10px] font-black text-gray-400 dark:text-neutral-600 uppercase tracking-[0.2em] ml-2 mb-2">
            Coordonnées
          </h3>
          <InfoRow icon="mail-outline" label="E-mail" value={user?.mail} />
          <InfoRow
            icon="call-outline"
            label="Téléphone"
            value={user?.telephone}
          />
          <InfoRow
            icon="location-outline"
            label="Localisation"
            value={`${user?.ville}, ${user?.code_postal}`}
          />
          {isProMode && (
            <InfoRow
              icon="business-outline"
              label="Entreprise"
              value={user?.raison_sociale}
            />
          )}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full p-5 mt-6 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-500 rounded-[24px] font-black uppercase text-[11px] tracking-widest transition active:scale-95 hover:bg-red-100 dark:hover:bg-red-500/20"
          >
            <IonIcon name="log-out" style={{ fontSize: "20px" }} />
            <span>Déconnexion</span>
          </button>
        </div>
      </main>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="size-10 rounded-2xl bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 flex items-center justify-center text-black dark:text-white shadow-sm shrink-0">
        <IonIcon name={icon as any} style={{ fontSize: "18px" }} />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[9px] font-black text-gray-400 dark:text-neutral-500 uppercase tracking-widest leading-none mb-1">
          {label}
        </span>
        <span className="text-[14px] font-bold text-black dark:text-white truncate">
          {value || "Non renseigné"}
        </span>
      </div>
    </div>
  );
}
