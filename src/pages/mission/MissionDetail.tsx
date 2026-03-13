import { useState } from "react";
import { useNavigate } from "react-router";
import IonIcon from "@reacticons/ionicons";

export default function MissionDetail() {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        // bg-white -> dark:bg-zinc-950 (un noir très profond pour l'OLED)
        <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">

            <header className="fixed top-0 left-0 w-full z-50 px-6 pt-12 flex justify-between items-center pointer-events-none">
                <button
                    onClick={() => navigate(-1)}
                    // bg-white/90 -> dark:bg-zinc-900/90 | border-gray-200 -> dark:border-zinc-800
                    className="size-12 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-gray-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center active:scale-90 transition-all shadow-lg pointer-events-auto"
                >
                    <IonIcon name="chevron-back" className="text-2xl text-black dark:text-white" />
                </button>

                <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="size-12 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-gray-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center shadow-lg pointer-events-auto active:scale-90 transition-all"
                >
                    <IonIcon
                        name={isFavorite ? "heart" : "heart-outline"}
                        className={`text-xl transition-colors ${isFavorite ? "text-red-500" : "text-black dark:text-white"}`}
                    />
                </button>
            </header>

            <div className="relative w-full h-[45vh] bg-gray-200 dark:bg-zinc-800">
                <img
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800"
                    className="w-full h-full object-cover"
                    alt="Mission"
                />
                {/* Ajustement du gradient pour qu'il se fonde dans le noir en bas */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white dark:to-zinc-950" />
            </div>

            {/* main bg-white -> dark:bg-zinc-900 */}
            <main className="relative -mt-10 bg-white dark:bg-zinc-900 rounded-t-[40px] px-8 pt-10 pb-32 shadow-2xl transition-colors duration-300">
                <div className="flex justify-between items-start mb-2">
                    {/* text-gray-400 -> dark:text-zinc-500 */}
                    <p className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-[0.2em]">
                        Plomberie • Aujourd'hui
                    </p>
                </div>

                <h1 className="text-3xl font-black text-black dark:text-white uppercase tracking-tighter leading-tight mb-6">
                    Réparation fuite évier
                </h1>

                <div className="flex items-center gap-3 mb-8">
                    {/* bg-gray-50 -> dark:bg-zinc-800/50 | border-gray-100 -> dark:border-zinc-800 */}
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 px-4 py-2.5 rounded-2xl">
                        <IonIcon name="location" className="text-black dark:text-zinc-400 text-sm" />
                        <span className="text-[10px] font-black uppercase tracking-tight dark:text-zinc-200">Toulouse</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 px-4 py-2.5 rounded-2xl">
                        <IonIcon name="person" className="text-black dark:text-zinc-400 text-sm" />
                        <span className="text-[10px] font-black uppercase tracking-tight dark:text-zinc-200">Gérard</span>
                    </div>
                </div>

                <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-400 dark:text-zinc-500 mb-4">Description</h3>
                <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed font-medium mb-10">
                    Bonjour, j'ai une fuite importante sous mon évier de cuisine.
                    Le siphon semble bouché et l'eau s'écoule lentement.
                    J'aurais besoin d'une intervention rapide si possible.
                </p>

                {/* Footer Action Card : Inversion des couleurs ou maintien du noir pur */}
                <div className="bg-black dark:bg-white rounded-[32px] p-7 flex justify-between items-center text-white dark:text-black shadow-xl shadow-black/20 transition-colors duration-300">
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-1">Budget estimé</p>
                        <p className="text-2xl font-black italic">45.00 €</p>
                    </div>
                    <button className="bg-white dark:bg-black text-black dark:text-white h-14 px-8 rounded-2xl font-black uppercase text-[11px] tracking-widest active:scale-95 transition-all shadow-lg">
                        Postuler
                    </button>
                </div>
            </main>
        </div>
    );
}