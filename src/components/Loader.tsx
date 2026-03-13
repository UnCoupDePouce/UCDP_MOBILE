export default function Loader() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-neutral-950 z-[100] transition-colors duration-300">

            <div className="mt-8 flex flex-col items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black dark:text-white animate-pulse">
                    Chargement
                </span>

                {/* Barre de progression avec tes couleurs CTA */}
                <div className="w-24 h-[3px] bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-black dark:bg-white w-1/2 rounded-full animate-[progress_1.5s_infinite_ease-in-out]"></div>
                </div>
            </div>

            <style>{`
                @keyframes progress {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
            `}</style>
        </div>
    );
}