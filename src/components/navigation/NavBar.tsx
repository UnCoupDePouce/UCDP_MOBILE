import { NavLink } from "react-router";
import { menuItems } from "../../data/menu.ts";
import IonIcon from "@reacticons/ionicons";

export function NavBar() {

    return (
        <div className="fixed bottom-6 md:bottom-0 left-0 w-full md:w-20 md:h-screen px-6 md:px-0 z-40 transition-all duration-300">
            <nav className="relative flex md:flex-col items-center justify-around md:justify-start md:gap-8 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-gray-100 dark:border-neutral-800 h-20 md:h-full rounded-[32px] md:rounded-none shadow-lg p-1.5 md:py-10">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className="flex-1 md:flex-none flex flex-col items-center justify-center transition-all duration-300 relative group w-full"
                    >
                        {({ isActive }) => (
                            <>
                                <div className={`hidden md:block absolute left-0 w-1 h-6 bg-black dark:bg-white rounded-r-full transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

                                <div className="h-7 flex items-center justify-center">
                                    <IonIcon
                                        name={isActive ? item.icon : `${item.icon}-outline` as any}
                                        className={`transition-all duration-300 ${
                                            isActive
                                                ? "text-black dark:text-white scale-110"
                                                : "text-gray-400 dark:text-neutral-600 group-hover:text-black dark:group-hover:text-white"
                                        }`}
                                        style={{ fontSize: item.name === "Créer" ? '28px' : '24px' }}
                                    />
                                </div>

                                <span className={`text-[9px] font-black uppercase tracking-widest mt-1 transition-all duration-300 md:hidden ${
                                    isActive ? "text-black dark:text-white opacity-100" : "opacity-0 h-0"
                                }`}>
                                    {isActive ? item.name : ""}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}