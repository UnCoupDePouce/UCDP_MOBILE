import { useState } from "react";
import IonIcon from "@reacticons/ionicons";

export default function OnboardingSlider({ onComplete }: { onComplete: () => void }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);

    const slides = [
        {
            icon: "flash-outline",
            title: "UN COUP DE POUCE",
            description: "La plateforme qui connecte vos besoins en travaux avec les meilleurs prestataires locaux."
        },
        {
            icon: "chatbubbles-outline",
            title: "ÉCHANGEZ SIMPLEMENT",
            description: "Discutez de vos projets, envoyez vos photos et validez vos devis en temps réel."
        },
        {
            icon: "star-outline",
            title: "VOTRE SATISFACTION",
            description: "Des interventions de qualité notées par la communauté pour un travail en toute confiance."
        }
    ];

    // --- LOGIQUE DU SLIDE ---
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart) return;
        const touchEnd = e.changedTouches[0].clientX;
        const distance = touchStart - touchEnd;

        if (distance > 50 && currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
        if (distance < -50 && currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
        setTouchStart(null);
    };

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-white dark:bg-neutral-950 z-[100] flex flex-col select-none transition-colors duration-500"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Header */}
            <div className="p-6 flex justify-end">
                <button onClick={onComplete} className="text-gray-400 dark:text-neutral-600 font-bold text-xs uppercase tracking-widest active:opacity-50">
                    Passer
                </button>
            </div>

            {/* Corps */}
            <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                {/* Utilisation de key pour reset l'animation à chaque slide */}
                <div key={currentSlide} className="animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="mb-12 text-black dark:text-white flex justify-center transition-colors">
                        <IonIcon name={slides[currentSlide].icon as any} style={{ fontSize: '100px' }} />
                    </div>

                    <div className="space-y-4 max-w-xs mx-auto">
                        <h2 className="text-4xl font-black tracking-tighter uppercase text-black dark:text-white transition-colors">
                            {slides[currentSlide].title}
                        </h2>
                        <p className="text-gray-500 dark:text-neutral-400 text-lg transition-colors">
                            {slides[currentSlide].description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-8 space-y-8">
                {/* Pagination Dots */}
                <div className="flex justify-center gap-3">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1.5 transition-all duration-300 rounded-full ${
                                index === currentSlide
                                    ? 'w-10 bg-neutral-950 dark:bg-white'
                                    : 'w-2 bg-gray-200 dark:bg-neutral-800'
                            }`}
                        />
                    ))}
                </div>

                {/* Bouton Action : Inversion en Dark Mode */}
                <button
                    onClick={handleNext}
                    className="w-full bg-neutral-950 dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black text-lg active:scale-95 transition-all uppercase shadow-xl dark:shadow-white/5"
                >
                    {currentSlide === slides.length - 1 ? 'Commencer' : 'Suivant'}
                </button>
            </div>
        </div>
    );
}