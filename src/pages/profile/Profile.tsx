import IonIcon from "@reacticons/ionicons";
import InfoRow from "../../components/profile/InfoRow.tsx";
import Loading from "../../components/Loading.tsx";
import { Header } from "../../components/headerPage/Header.tsx";
import { useProfile } from "./useProfile.ts";

export default function Profile() {
  const {
    user,
    loading,
    error,
    id_user,
    isAdmin,
    isProMode,
    setIsProMode,
    displayName,
    initials,
    handleLogout,
    clearUser,
    navigate,
  } = useProfile();

  if (loading) return <Loading />;

  if (error || !id_user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-10">
        <div className="text-center space-y-6 max-w-xs">
          <div className="size-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
            <IonIcon name="alert-circle-outline" className="text-4xl text-red-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-neutral-900">Session expirée</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Pour des raisons de sécurité, votre session a pris fin.
            </p>
          </div>
          <button
            onClick={clearUser}
            className="w-full py-4 bg-black text-white text-[11px] font-bold uppercase tracking-widest rounded-2xl transition active:scale-95"
          >
            Se reconnecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-28 font-sans">
      <div className="max-w-7xl mx-auto px-6 pb-28">
        <Header title="Profil" showButton={"null"} />
        {isAdmin && (
          <div className="mb-8 p-1 bg-neutral-200/50 rounded-2xl flex items-center backdrop-blur-sm">
            <button
              onClick={() => setIsProMode(false)}
              className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${!isProMode ? "bg-white text-black shadow-sm" : "text-neutral-500"
                }`}
            >
              Particulier
            </button>
            <button
              onClick={() => setIsProMode(true)}
              className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${isProMode ? "bg-black text-white shadow-md" : "text-neutral-500"
                }`}
            >
              Professionnel
            </button>
          </div>
        )}

        <section className="flex flex-col items-center mb-12">
          <div className="relative group">
            <div className="size-28 rounded-[38px] bg-gradient-to-br from-neutral-100 to-neutral-200 border-4 border-white shadow-xl flex items-center justify-center text-3xl font-bold text-neutral-800 transition-transform group-hover:scale-105 duration-500">
              {initials}
            </div>
          </div>

          <div className="text-center mt-6">
            <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
              {displayName}
            </h2>
            <div className="mt-1.5 inline-flex items-center px-3 py-1 bg-white border border-neutral-200 rounded-full">
              <span className="size-1.5 rounded-full bg-indigo-500 animate-pulse mr-2" />
              <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
                {isProMode ? user?.raison_sociale : "Compte Client"}
              </span>
            </div>
          </div>
        </section>

        <div className="space-y-8">
          <section>
            <h3 className="px-2 mb-3 text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em]">
              Contact & Coordonnées
            </h3>
            <div className="bg-white rounded-[28px] p-2 shadow-sm border border-neutral-100 overflow-hidden">
              <InfoRow icon="mail-outline" label="E-mail" value={user?.mail} />
              <InfoRow icon="call-outline" label="Téléphone" value={user?.telephone.toString()} />
              <InfoRow
                icon="location-outline"
                label="Adresse"
                value={`${user?.ville}, ${user?.code_postal}`}
              />
              {isProMode && (
                <InfoRow icon="business-outline" label="Entreprise" value={user?.raison_sociale} />
              )}
            </div>
          </section>

          <section>
            <h3 className="px-2 mb-3 text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em]">
              Assistance & Légal
            </h3>
            <div className="bg-white rounded-[28px] p-2 shadow-sm border border-neutral-100">
              <InfoRow
                icon="shield-checkmark-outline"
                label="Confidentialité"
                value="Gérer mes données"
                onClick={() => navigate("/legal/rgpd")}
              />
              <InfoRow
                icon="document-text-outline"
                label="Conditions"
                value="CGU / CGV"
                onClick={() => navigate("/legal/terms")}
              />
              <div className="flex items-center justify-between p-4 px-5">
                <div className="flex items-center gap-4">
                  <div className="size-10 bg-neutral-50 rounded-xl flex items-center justify-center text-neutral-400">
                    <IonIcon name="information-circle-outline" className="text-xl" />
                  </div>
                  <span className="text-[13px] font-semibold text-neutral-800">Version</span>
                </div>
                <span className="text-[11px] font-bold text-neutral-400 bg-neutral-100 px-2 py-1 rounded-md">
                  V 1.0.0
                </span>
              </div>
            </div>
          </section>

          {/* Logout - Style plus "Premium Danger" */}
          <button
            onClick={handleLogout}
            className="group flex items-center justify-between w-full p-5 bg-white border border-red-100 rounded-[28px] transition-all active:scale-[0.98] hover:bg-red-50"
          >
            <div className="flex items-center gap-4">
              <div className="size-10 bg-red-50 group-hover:bg-red-100 rounded-xl flex items-center justify-center text-red-500 transition-colors">
                <IonIcon name="log-out-outline" className="text-xl" />
              </div>
              <span className="text-[13px] font-bold text-red-600 uppercase tracking-widest">
                Déconnexion
              </span>
            </div>
            <IonIcon name="chevron-forward-outline" className="text-red-300" />
          </button>
        </div>
      </div>
    </main>
  );
}