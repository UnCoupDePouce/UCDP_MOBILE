import { useState, useCallback } from "react";
import { Header } from "../components/navigation/Header.tsx";
import IonIcon from "@reacticons/ionicons";
import { useTheme } from "../providers/ThemeProvider.tsx";

export default function Profile() {
    const [isProMode, setIsProMode] = useState(false);
    const { theme, setTheme } = useTheme();

    const toggleTheme = useCallback(() => {
        setTheme(theme === "dark" ? "light" : "dark");
    }, [theme, setTheme]);

    const isDark = theme === "dark";

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
            <Header title="Mon Profil"/>

            <main className="px-6 py-4 pb-32">

                {/* 1. Toggle Thème (Dark/Light) */}
                <div className="mb-6 flex justify-end">
                    <button
                        onClick={toggleTheme}
                        className="relative w-14 h-8 bg-gray-100 dark:bg-neutral-800 rounded-full p-1 transition-colors duration-300 border border-gray-200 dark:border-neutral-700"
                    >
                        <div className={`absolute top-1 left-1 size-6 rounded-full bg-white dark:bg-neutral-950 shadow-sm flex items-center justify-center transition-transform duration-300 ${isDark ? 'translate-x-6' : 'translate-x-0'}`}>
                            <IonIcon
                                name={isDark ? "moon" : "sunny"}
                                className={isDark ? "text-indigo-400" : "text-amber-500"}
                                style={{ fontSize: '14px' }}
                            />
                        </div>
                    </button>
                </div>

                {/* 2. Switch Mode Client / Pro */}
                <div className="mb-10 bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 p-1.5 rounded-[24px] flex items-center relative h-14 transition-all">
                    <div
                        className={`absolute h-[44px] w-[calc(50%-6px)] bg-black dark:bg-white rounded-[18px] transition-transform duration-300 ease-out ${
                            isProMode ? "translate-x-[calc(100%+0px)]" : "translate-x-0"
                        }`}
                    />
                    <button
                        onClick={() => setIsProMode(false)}
                        className={`flex-1 relative z-10 text-[10px] font-black uppercase tracking-widest transition-colors ${
                            !isProMode ? "text-white dark:text-black" : "text-gray-400 dark:text-neutral-500"
                        }`}
                    >
                        Mode Client
                    </button>
                    <button
                        onClick={() => setIsProMode(true)}
                        className={`flex-1 relative z-10 text-[10px] font-black uppercase tracking-widest transition-colors ${
                            isProMode ? "text-white dark:text-black" : "text-gray-400 dark:text-neutral-500"
                        }`}
                    >
                        Mode Pro
                    </button>
                </div>

                {/* 3. Avatar & Identité */}
                <div className="flex flex-col items-center mb-10">
                    <div className="relative">
                        <div className="size-28 rounded-[32px] overflow-hidden border border-gray-100 dark:border-neutral-800 p-1.5 bg-gray-50 dark:bg-neutral-900 shadow-sm">
                            <img
                                src="https://i.pravatar.cc/150?u=2"
                                alt="Avatar"
                                className="w-full h-full rounded-[24px] object-cover"
                            />
                        </div>
                        <button className="absolute -bottom-2 -right-2 bg-black dark:bg-white text-white dark:text-black size-10 rounded-2xl shadow-xl flex items-center justify-center border-4 border-white dark:border-neutral-950 active:scale-90 transition-all">
                            <IonIcon name="camera" style={{fontSize: '18px'}}/>
                        </button>
                    </div>
                    <h2 className="mt-6 text-2xl font-black text-black dark:text-white uppercase tracking-tighter transition-colors">Prénom Nom</h2>
                    <p className="text-[10px] font-black text-gray-400 dark:text-neutral-500 uppercase tracking-[0.2em] mt-1 transition-colors">
                        {isProMode ? "Artisan Professionnel" : "Client Particulier"}
                    </p>
                </div>

                {/* 4. Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                    <StatCard value={isProMode ? "24" : "12"} label={isProMode ? "Réalisations" : "Demandes"} />
                    <StatCard value="4.9" label="Note" />
                </div>

                {/* 5. Menu Actions */}
                <div className="flex flex-col gap-y-3">
                    <h3 className="text-[10px] font-black text-gray-400 dark:text-neutral-600 uppercase tracking-[0.2em] ml-2 mb-2 transition-colors">Compte</h3>

                    {isProMode && <MenuButton icon="briefcase" label="Mon entreprise"/>}
                    <MenuButton icon="person" label="Informations personnelles"/>
                    <MenuButton icon="wallet" label="Portefeuille & Paiement"/>
                    <MenuButton icon="shield-checkmark" label="Sécurité"/>
                    <MenuButton icon="help-circle" label="Centre d'aide"/>

                    <button className="flex items-center justify-center gap-3 w-full p-5 mt-6 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-500 rounded-[24px] font-black uppercase text-[11px] tracking-widest transition active:scale-95">
                        <IonIcon name="log-out" style={{fontSize: '20px'}}/>
                        <span>Déconnexion</span>
                    </button>
                </div>
            </main>
        </div>
    );
}

function StatCard({ value, label }: { value: string, label: string }) {
    return (
        <div className="bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 p-5 rounded-[28px] text-center transition-all">
            <span className="block text-2xl font-black text-black dark:text-white">{value}</span>
            <span className="text-[9px] font-black text-gray-400 dark:text-neutral-500 uppercase tracking-widest mt-1 italic">{label}</span>
        </div>
    );
}

function MenuButton({icon, label}: { icon: string, label: string }) {
    return (
        <button className="flex items-center justify-between w-full p-3.5 bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-[24px] transition-all active:scale-[0.98] group overflow-hidden">
            <div className="flex items-center gap-3 min-w-0">
                <div className="size-10 shrink-0 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl flex items-center justify-center text-black dark:text-white shadow-sm group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                    <IonIcon name={icon as any} style={{fontSize: '20px'}}/>
                </div>
                <span className="text-[13px] font-black text-black dark:text-white uppercase tracking-tighter truncate transition-colors">
                    {label}
                </span>
            </div>
            <IonIcon name="chevron-forward" className="text-gray-300 dark:text-neutral-700 shrink-0 ml-2"/>
        </button>
    );
}