import {useState} from "react";
import IonIcon from "@reacticons/ionicons";

export default function OnboardingSlider({onComplete}: { onComplete: () => void; }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);

    const slides = [
        {
            icon: "flash-outline",
            title: "UN COUP DE POUCE",
            description: "La plateforme qui connecte vos besoins en travaux avec les meilleurs prestataires locaux.",
            accent: "#000000"
        },
        {
            icon: "chatbubbles-outline",
            title: "ÉCHANGEZ SIMPLEMENT",
            description: "Discutez de vos projets, envoyez vos photos et validez vos devis en temps réel.",
            accent: "#000000"
        },
        {
            icon: "star-outline",
            title: "VOTRE SATISFACTION",
            description: "Des interventions de qualité notées par la communauté pour un travail en toute confiance.",
            accent: "#000000"
        },
    ];

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
            className="fixed inset-0 bg-white  z-[100] flex flex-col select-none transition-colors duration-500"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {currentSlide === slides.length - 1 ?
                (
                    <></>
                ) : (
                    <div className="p-6 flex justify-end">
                        <button
                            onClick={onComplete}
                            className="link tracking-widest active:opacity-50"
                        >
                            Passer
                        </button>
                    </div>
                )}

            <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
                <div
                    key={currentSlide}
                    className="animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-500"
                >
                    <div
                        className="mb-8 flex justify-center transition-colors duration-500"
                        style={{color: slides[currentSlide].accent}}
                    >
                        <IonIcon
                            name={slides[currentSlide].icon as never}
                            style={{fontSize: "100px"}}
                        />
                    </div>

                    <div className="space-y-4 max-w-sm mx-auto">
                        <h2 className="text-3xl font-[1000] tracking-tighter uppercase leading-tight transition-colors duration-500"
                            style={{color: slides[currentSlide].accent}}>
                            {slides[currentSlide].title}
                        </h2>
                        <p className="text-gray-400 text-base leading-relaxed font-medium px-4">
                            {slides[currentSlide].description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-10 flex flex-col items-center space-y-8">
                <div className="flex justify-center gap-2.5">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className="h-1.5 rounded-full transition-all duration-500"
                            style={{
                                width: index === currentSlide ? "32px" : "6px",
                                backgroundColor: index === currentSlide ? slides[currentSlide].accent : "#E5E7EB"
                            }}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className="action active:scale-95 transition-all shadow-xl"
                >
                    {currentSlide === slides.length - 1 ? "Commencer" : "Suivant"}
                </button>
            </div>
        </div>
    );
}