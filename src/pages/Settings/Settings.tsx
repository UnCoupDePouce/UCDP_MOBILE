import {Bell, HelpCircle, Moon, Smartphone} from "lucide-react";
import {useEffect, useState} from "react";
import HeaderNameArrow from "../../components/Header/HeaderNameArrow.tsx";

export default function SettingsPage() {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const htmlElement = document.documentElement;
        const currentTheme = darkMode ? "dark" : "light";

        htmlElement.setAttribute("data-theme", currentTheme);
        localStorage.setItem("theme", currentTheme);

        if (darkMode) {
            htmlElement.classList.add("dark");
        } else {
            htmlElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <>
            <HeaderNameArrow name={"Paramètres"}/>
            <div className="flex flex-col px-4 py-8 my-20">
                <div>
                    <div className="flex flex-col gap-12">

                        <div className="flex flex-col gap-3">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-2">
                                Préférences application
                            </h2>
                            <div
                                className="rounded-3xl shadow-sm border overflow-hidden border-gray-100 dark:border-gray-800">

                                <div
                                    className="flex items-center justify-between p-4 border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center gap-3">
                                        <Bell size={18} className="text-blue-500"/>
                                        <span className="text-sm font-semibold">Notifications Push</span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary toggle-sm"
                                        checked={notifications}
                                        onChange={() => setNotifications(!notifications)}
                                    />
                                </div>

                                <hr className="border-gray-100 dark:border-gray-800"/>

                                <div className="flex items-center justify-between p-4">
                                    <div className="flex items-center gap-3">
                                        <Moon size={18} className="text-purple-500"/>
                                        <span className="text-sm font-semibold">Mode Sombre</span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-secondary toggle-sm"
                                        checked={darkMode}
                                        onChange={() => setDarkMode(!darkMode)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-2">
                                Assistance
                            </h2>
                            <div
                                className="rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">

                                <button
                                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <HelpCircle size={18} className="text-gray-400"/>
                                        <span className="text-sm font-semibold">Centre d'aide</span>
                                    </div>
                                </button>

                                <hr className="border-gray-100 dark:border-gray-800"/>

                                <div className="flex items-center justify-between p-4 opacity-60">
                                    <div className="flex items-center gap-3">
                                        <Smartphone size={18} className="text-gray-400"/>
                                        <span className="text-sm font-semibold">Version de l'app</span>
                                    </div>
                                    <span className="text-xs font-mono">v1.0.4</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}