import { useState } from "react";
import IonIcon from "@reacticons/ionicons";
import { IonPage, IonContent } from "@ionic/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import 'swiper/css'
import '@ionic/react/css/ionic-swiper.css';

export default function OnboardingSlider({ onComplete }: { onComplete: () => void }) {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [swiper, setSwiper] = useState<SwiperClass>();

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

    const handleNext = () => {
        if (!swiper) return;

        if (currentSlide < slides.length - 1) {
            swiper.slideNext();
        } else {
            onComplete();
        }
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="fixed inset-0 bg-white dark:bg-neutral-950 z-[100] flex flex-col">

                    <div className="p-6 flex justify-end">
                        <button
                            onClick={onComplete}
                            className="text-gray-400 dark:text-neutral-600 font-bold text-xs uppercase tracking-widest"
                        >
                            Passer
                        </button>
                    </div>
                    <Swiper
                        onSwiper={setSwiper}
                        onSlideChange={(s) => setCurrentSlide(s.activeIndex)}
                        className="flex-1"
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col items-center justify-center h-full px-8 text-center">
                                    <div className="mb-12 text-black dark:text-white flex justify-center">
                                        <IonIcon name={slide.icon as any} style={{ fontSize: '100px' }} />
                                    </div>

                                    <div className="space-y-4 max-w-xs">
                                        <h2 className="text-4xl font-black tracking-tighter uppercase text-black dark:text-white">
                                            {slide.title}
                                        </h2>

                                        <p className="text-gray-500 dark:text-neutral-400 text-lg">
                                            {slide.description}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>

                        ))}

                    </Swiper>

                    <div className="p-8 space-y-8">

                        <div className="flex justify-center gap-3">
                            {slides.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-1.5 transition-all duration-300 rounded-full ${index === currentSlide
                                        ? 'w-10 bg-neutral-950 dark:bg-white'
                                        : 'w-2 bg-gray-200 dark:bg-neutral-800'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-full bg-neutral-950 dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black text-lg active:scale-95 transition-all uppercase"
                        >
                            {currentSlide === slides.length - 1 ? 'Commencer' : 'Suivant'}
                        </button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}