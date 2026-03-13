import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const maxDimension = Math.max(window.innerWidth, window.innerHeight);
        const baseSize = 128;
        const maxScale = (maxDimension / baseSize) * 1.5;

        const tl = gsap.timeline({ onComplete });

        tl.from(textRef.current, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            ease: "power3.out"
        })
            .from(circleRef.current, {
                scale: 0,
                duration: 0.6,
                ease: "back.out(1.6)"
            })
            .to(circleRef.current, {
                scale: maxScale,
                duration: 1,
                ease: "power4.inOut"
            })
            .to(textRef.current, {
                color: "#ffffff",
                duration: 0.3
            }, "-=0.6");

        return () => {
            tl.kill();
        }
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="px-4 fixed inset-0 bg-white flex items-center justify-center overflow-hidden"
        >
            <div className="relative flex items-center justify-center">
                <div
                    ref={circleRef}
                    className="absolute w-32 h-32 bg-black rounded-full will-change-transform"
                />

                <h1
                    ref={textRef}
                    className="relative text-black text-5xl font-black will-change-transform"
                >
                    UN COUP DE POUCE
                </h1>
            </div>
        </div>
    );
}