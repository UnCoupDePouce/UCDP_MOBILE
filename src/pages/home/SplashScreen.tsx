import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const wordsRef = useRef<HTMLSpanElement[]>([]);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                const exitTl = gsap.timeline({ onComplete });

                exitTl.to(wordsRef.current, {
                    z: 300,
                    opacity: 0,
                    stagger: 0.02,
                    duration: 0.4,
                    ease: "power2.in"
                })
                    .to(containerRef.current, {
                        opacity: 0,
                        duration: 0.6,
                        ease: "power2.out"
                    }, "-=0.2");
            }
        });

        tl.set(textRef.current, { perspective: 1000 });
        tl.set(wordsRef.current, {
            opacity: 0,
            y: 50,
            z: -200,
            rotationX: -90
        });

        tl.fromTo(circleRef.current,
            { scale: 0 },
            { scale: 1, duration: 0.4, ease: "back.out(2)" }
        )
            .to(circleRef.current, {
                x: "random(-4, 4)",
                y: "random(-4, 4)",
                repeat: 10,
                duration: 0.05,
                ease: "none"
            })

            .to(circleRef.current, {
                scale: 80,
                duration: 0.7,
                ease: "expo.in"
            })

            .to(wordsRef.current, {
                opacity: 1,
                y: 0,
                z: 0,
                rotationX: 0,
                stagger: 0.08,
                duration: 0.8,
                ease: "expo.out"
            }, "-=0.2")

            .to({}, { duration: 1 });

        return () => { tl.kill(); };
    }, [onComplete]);

    const phrase = "UN COUP DE POUCE !";

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 bg-white z-50 flex items-center justify-center overflow-hidden"
        >
            <div
                ref={circleRef}
                className="w-10 h-10 rounded-full bg-[#FF791D] absolute"
            />

            <h1 ref={textRef} className="relative flex gap-3 text-white text-4xl md:text-6xl font-[1000] italic tracking-tighter uppercase leading-none">
                {phrase.split(" ").map((word, i) => (
                    <span
                        key={i}
                        ref={(el) => {wordsRef.current[i] = el!}}
                        className="inline-block"
                    >
                        {word}
                    </span>
                ))}
            </h1>
        </div>
    );
}