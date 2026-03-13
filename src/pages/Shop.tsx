import {useNavigate} from "react-router";
import IonIcon from "@reacticons/ionicons";

const CREDIT_PACKS = [
    {id: 1, credits: "50", price: "4.99€", bonus: "", icon: "flash", color: "bg-blue-600"},
    {id: 2, credits: "150", price: "12.99€", bonus: "+10% inclus", icon: "flame", color: "bg-orange-500"},
    {id: 3, credits: "500", price: "39.99€", bonus: "Meilleure offre", icon: "diamond", color: "bg-purple-600"},
];

export default function Shop() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-[#0A0A0A] transition-colors duration-300 font-sans">
            {/* Header fixe */}
            <header className="px-6 pt-12 pb-6 flex items-center justify-between border-b border-gray-100 dark:border-white/5 sticky top-0 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-md z-50">
                <button
                    onClick={() => navigate(-1)}
                    className="size-11 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/5 rounded-2xl flex items-center justify-center active:scale-90 transition-all text-black dark:text-white"
                >
                    <IonIcon name="close" className="text-2xl"/>
                </button>
                <h1 className="text-sm font-black uppercase tracking-widest text-black dark:text-white">Boutique</h1>
                <div className="size-11 opacity-0 pointer-events-none"/>
            </header>

            <main className="px-6 pt-8 pb-32">
                {/* Solde Actuel */}
                <section className="bg-black dark:bg-white p-8 rounded-[40px] mb-12 shadow-2xl shadow-black/20 dark:shadow-white/5 relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 dark:text-black/40 mb-2">Ton Solde Actuel</p>
                        <h2 className="text-5xl font-black text-white dark:text-black tracking-tighter italic">10.00 €</h2>
                    </div>
                    <div className="absolute -right-10 -bottom-10 size-40 bg-white/10 dark:bg-black/5 rounded-full blur-3xl"/>
                </section>

                <div className="space-y-8">
                    <header>
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-black dark:text-white">Packs de Crédits</h3>
                        <p className="text-[10px] font-black text-gray-400 dark:text-neutral-500 uppercase tracking-widest mt-1">Boostez votre visibilité</p>
                    </header>

                    <div className="grid gap-6">
                        {CREDIT_PACKS.map((pack) => (
                            <button
                                key={pack.id}
                                className="group relative w-full bg-gray-50 dark:bg-neutral-900/50 border-2 border-gray-100 dark:border-white/5 p-6 rounded-[32px] flex items-center transition-all active:scale-[0.98] hover:border-black dark:hover:border-white"
                            >
                                {/* Badge Bonus - Positionné de façon à ne pas pousser le contenu */}
                                {pack.bonus && (
                                    <div className="absolute -top-3 -left-2 bg-green-500 text-white text-[8px] font-black uppercase px-3 py-1.5 rounded-full shadow-lg z-10 rotate-[-2deg]">
                                        {pack.bonus}
                                    </div>
                                )}

                                <div className="flex items-center gap-5 w-full">
                                    {/* Icon Box - Taille fixe */}
                                    <div className={`size-16 shrink-0 ${pack.color} rounded-[22px] flex items-center justify-center text-white shadow-lg`}>
                                        <IonIcon name={pack.icon as any} className="text-3xl"/>
                                    </div>

                                    {/* Infos (Prend l'espace restant) */}
                                    <div className="flex-1 text-left">
                                        <span className="text-xl font-black text-black dark:text-white uppercase leading-none block">
                                            {pack.credits} Crédits
                                        </span>
                                        <p className="text-[10px] font-black text-gray-400 dark:text-neutral-500 uppercase tracking-widest mt-1">
                                            Paiement unique
                                        </p>
                                    </div>

                                    {/* Prix - Centré à droite verticalement */}
                                    <div className="shrink-0 ml-4">
                                        <span className="text-lg font-black text-black dark:text-white italic tracking-tighter">
                                            {pack.price}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Section Info */}
                <div className="mt-12 p-6 bg-gray-50 dark:bg-neutral-900 rounded-[32px] border border-dashed border-gray-200 dark:border-white/10">
                    <div className="flex gap-4 items-start">
                        <IonIcon name="shield-checkmark" className="text-2xl text-black dark:text-white shrink-0"/>
                        <div>
                            <h4 className="text-[10px] font-black uppercase text-black dark:text-white mb-1">Paiement Sécurisé</h4>
                            <p className="text-[10px] font-medium text-gray-400 dark:text-neutral-500 leading-relaxed">
                                Vos transactions sont protégées. Les crédits sont ajoutés instantanément après validation.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}