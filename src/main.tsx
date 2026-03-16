import "./index.css";
import { createRoot } from "react-dom/client";
import {
    BrowserRouter,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from "react-router";
import { useState } from "react";
import { NavBar } from "./components/navigation/NavBar.tsx";
import { excludedRoutes } from "./data/excludedRoutes.ts";
import { NavigationProvider } from "./providers/NavigationProvider.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import { UnreadMessagesProvider } from "./providers/UnreadMessagesProvider.tsx";
import ProtectedRoute from "./routes/ProtectedRoutes.tsx";
import AddMission from "./pages/mission/AddMission.tsx";
import Accueil from "./pages/Accueil.tsx";
import Profile from "./pages/Profile.tsx";
import Notification from "./pages/Notification.tsx";
import ChatDetail from "./pages/chat/ChatDetail.tsx";
import MissionDetail from "./pages/mission/MissionDetail.tsx";
import SplashScreen from "./pages/SplashScreen.tsx";
import OnboardingSlider from "./pages/OnBoardingSlider.tsx";
import Login from "./pages/connection/Login.tsx";
import Register from "./pages/connection/Register.tsx";
import Shop from "./pages/Shop.tsx";
import ChatIndex from "./pages/chat/ChatIndex.tsx";
import Layout from "./pages/chat/Layout.tsx";
import AllMission from "./pages/mission/AllMission.tsx";
import Error404 from "./pages/404/Error404.tsx";

export default function AppRouter() {
    const location = useLocation();
    const navigate = useNavigate();

    const [showSplash, setShowSplash] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);

    const handleSplashComplete = () => {
        const hasToken = localStorage.getItem("hasToken");
        const hasSeenOnboarding =
            localStorage.getItem("hasSeenOnboarding") === "true";

        setShowSplash(false);

        if (hasToken) {
            setShowOnboarding(false);
            navigate("/");
        } else if (!hasSeenOnboarding) {
            setShowOnboarding(true);
        } else {
            navigate("/login");
        }
    };

    const handleOnboardingComplete = () => {
        localStorage.setItem("hasSeenOnboarding", "true");
        setShowOnboarding(false);
        navigate("/login");
    };

    const isExcluded = excludedRoutes.some((route) => {
        if (window.innerWidth <= 768 && route.includes(":id")) {
            const baseRoute = route.replace("/:id", "");
            return (
                location.pathname.startsWith(baseRoute) &&
                location.pathname !== baseRoute
            );
        }
        return location.pathname === route;
    });

    if (showSplash) {
        return <SplashScreen onComplete={handleSplashComplete} />;
    }

    if (showOnboarding) {
        return <OnboardingSlider onComplete={handleOnboardingComplete} />;
    }

    return (
        <div className="font-montserrat flex flex-col min-h-screen w-full bg-white">
            {!isExcluded && <NavBar />}
            <main
                className={`flex-1 flex flex-col ${!isExcluded ? "md:pl-20" : ""} transition-all duration-300`}
            >
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Accueil />} />
                        <Route path="/message" element={<Layout />}>
                            <Route index element={<ChatIndex />} />
                            <Route path=":id" element={<ChatDetail />} />
                        </Route>
                        <Route path="user" element={<Profile />} />
                        <Route path="mission" element={<AllMission />} />
                        <Route path="mission/:id" element={<MissionDetail />} />
                        <Route path="new/mission" element={<AddMission />} />
                        <Route path="notification" element={<Notification />} />
                        <Route path="shop" element={<Shop />} />
                    </Route>

                    <Route path="*" element={<Error404 />} />
                </Routes>
            </main>
        </div>
    );
}

createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
        <BrowserRouter>
            <NavigationProvider>
                <UnreadMessagesProvider>
                    <AppRouter />
                </UnreadMessagesProvider>
            </NavigationProvider>
        </BrowserRouter>
    </ThemeProvider>,
);
