import { useEffect } from "react";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F2F0EB]">
            <div className="relative flex flex-col items-center">
                <h1 className="text-6xl font-black tracking-tighter italic leading-none">
                    <span className="text-[#f18742]">UCP</span>
                </h1>
            </div>
        </div>
    );
}