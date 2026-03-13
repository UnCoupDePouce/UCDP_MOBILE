import { NavLink, useLocation } from "react-router";
import { useNavigationStack } from "../../providers/NavigationProvider.tsx";
import IonIcon from "@reacticons/ionicons";
import { useEffect, useState } from "react";
import { mainRoutes } from "../../data/navigationStack.ts";

export function Header({ title, showButton }: { title: string, showButton?: boolean }) {
    const navStack = useNavigationStack();
    const location = useLocation();
    const prevPath: string = navStack.getPreviousPath();

    const [isSticky, setIsSticky] = useState(false);

    const showBackButton = showButton && (!mainRoutes.includes(location.pathname));
    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-[100] w-full px-6 transition-all duration-300 border-b
            ${isSticky
                ? "bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-md border-gray-100 dark:border-white/5 pt-12 pb-4"
                : "bg-white dark:bg-[#0A0A0A] border-transparent pt-12 pb-6"
            }`}
        >
            <div className="flex items-center gap-4">
                {showBackButton && (
                    <NavLink
                        to={prevPath}
                        className="size-10 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/5 rounded-xl flex items-center justify-center active:scale-90 transition-all text-black dark:text-white"
                    >
                        <IonIcon name="chevron-back" className="text-xl"/>
                    </NavLink>
                )}

                <h1 className="text-sm font-black uppercase tracking-widest text-black dark:text-white truncate">
                    {title}
                </h1>
            </div>
        </header>
    );
}