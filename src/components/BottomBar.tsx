import {BookCheck, Home, MessageCircle, Plus, Search, User} from "lucide-react";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {useLocation, useNavigate} from "react-router";

export function BottomBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [active, setActive] = useState("home");
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const role = localStorage.getItem("role");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUserRole(role);
    }, []);

    const searchItem = {id: "search", icon: Search, path: "/search"};

    const allItems = [
        {id: "home", icon: Home, path: "/"},
        {id: "chat", icon: MessageCircle, path: "/chat"},
        {id: "add", icon: Plus, path: "/add"},
        {id: "book", icon: BookCheck, path: "/candidate"},
        {id: "user", icon: User, path: "/user"},
    ];

    const items = allItems.filter(item => {
        if (item.id === "add" && userRole === "PRESTATAIRE") {
            return false;
        }
        return true;
    });

    useEffect(() => {
        const currentPath = location.pathname;
        const currentItem = items.find(item => item.path === currentPath);

        if (currentItem) {

            setActive(currentItem.id);
        } else if (currentPath.startsWith(searchItem.path)) {
            setActive(searchItem.id);
        } else if (currentPath.startsWith("/legal") || currentPath.startsWith("/settings")) {
            setActive("user");
        }
    }, [location.pathname]);

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const glassStyle = `
        bg-gradient-to-b from-white/20 to-white/5
        backdrop-blur-xl 
        border border-white/30
        shadow-[0_8px_32px_0_rgba(31,38,135,0.15),inset_0_1px_1px_0_rgba(255,255,255,0.4)]
    `;

    return (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center items-end gap-3 z-50 pointer-events-none">
            <div className={`flex items-center gap-2 p-2 rounded-full pointer-events-auto ${glassStyle}`}>
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => handleNavigation(item.path)}
                            className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300
                                ${isActive ? "text-white" : "hover:text-white"}
                            `}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="liquid-pill"
                                    className="absolute inset-0 bg-white rounded-full shadow-[0_4px_12px_rgba(255,255,255,0.3),inset_0_1px_2px_rgba(255,255,255,0.6)]"
                                    transition={{type: "spring", stiffness: 380, damping: 30}}
                                />
                            )}

                            <span className="relative z-10 mix-blend-exclusion">
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 2}/>
                            </span>
                            {isActive && (
                                <motion.span
                                    layoutId="liquid-dot"
                                    className="absolute -bottom-1 w-1.5 h-1.5 bg-orange-500 rounded-full"
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            <div
                className={`p-0 rounded-full pointer-events-auto flex items-center justify-center w-16 h-16 ${glassStyle}`}>
                <button
                    onClick={() => handleNavigation(searchItem.path)}
                    className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300
                        ${active === searchItem.id ? "text-white" : "hover:text-white"}
                    `}
                >
                    {active === searchItem.id && (
                        <motion.div
                            layoutId="liquid-pill"
                            className="absolute inset-0 bg-white rounded-full shadow-[0_4px_12px_rgba(255,255,255,0.3),inset_0_1px_2px_rgba(255,255,255,0.6)]"
                            transition={{type: "spring", stiffness: 380, damping: 30}}
                        />
                    )}
                    <span className="relative z-10 mix-blend-exclusion">
                        <Search size={22} strokeWidth={active === searchItem.id ? 2.5 : 2}/>
                    </span>

                    {active === searchItem.id && (
                        <motion.span
                            layoutId="liquid-dot"
                            className="absolute -bottom-1 w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_8px_#f97316]"
                            transition={{type: "spring", stiffness: 300, damping: 25}}
                        />
                    )}
                </button>
            </div>

        </div>
    );
}