import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from 'react-router';
import './index.css'
import AddMission from "./pages/mission/AddMission.tsx";
import Accueil from "./pages/Accueil.tsx";
import Chat from "./pages/chat/Chat.tsx";
import Profile from "./pages/Profile.tsx";
import MyMission from "./pages/mission/MyMission.tsx";
import {NavBar} from "./components/navigation/NavBar.tsx";
import Notification from "./pages/Notification.tsx";
import {excludedRoutes} from "./data/excludedRoutes.ts";
import {NavigationProvider} from "./context/NavigationProvider.tsx";
import ChatDetail from "./pages/chat/ChatDetail.tsx";
import MissionDetail from "./pages/mission/MissionDetail.tsx";
import AllMission from "./pages/mission/AllMission.tsx";
import {useState} from "react";
import SplashScreen from "./pages/SplashScreen.tsx";
import OnboardingSlider from "./pages/OnBoardingSlider.tsx";
import Login from "./pages/connection/Login.tsx";
import Register from "./pages/connection/Register.tsx";
import Shop from "./pages/Shop.tsx";
import {ThemeProvider} from "./context/ThemeProvider.tsx";

export default function AppRouter() {
    const location = useLocation();
    const navigate = useNavigate();

    const [showSplash, setShowSplash] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);

    const handleSplashComplete = () => {
        const hasToken = localStorage.getItem('hasToken');
        const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding') === 'true';

        setShowSplash(false);

        if (hasToken) {
            setShowOnboarding(false);
            navigate('/');
        } else if (!hasSeenOnboarding) {
            setShowOnboarding(true);
        } else {
            navigate('/login');
        }
    };

    const handleOnboardingComplete = () => {
        localStorage.setItem('hasSeenOnboarding', 'true');
        setShowOnboarding(false);
        navigate('/login');
    };

    const isExcluded = excludedRoutes.some(route => {
        if (route.includes(':id')) {
            const baseRoute = route.replace('/:id', '');
            return location.pathname.startsWith(baseRoute) && location.pathname !== baseRoute;
        }
        return location.pathname === route;
    });

    if (showSplash) {
        return <SplashScreen onComplete={handleSplashComplete}/>;
    }

    if (showOnboarding) {
        return <OnboardingSlider onComplete={handleOnboardingComplete}/>;
    }

    return (
        <div className="font-montserrat flex flex-col min-h-screen w-full bg-white">
            <Routes>
                <Route path="/" element={<Accueil/>}/>
                <Route path="message" element={<Chat/>}/>
                <Route path="message/:id" element={<ChatDetail/>}/>
                <Route path="user" element={<Profile/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="mission" element={<MyMission/>}/>
                <Route path="all" element={<AllMission/>}/>
                <Route path="mission/:id" element={<MissionDetail/>}/>
                <Route path="new/mission" element={<AddMission/>}/>
                <Route path="notification" element={<Notification/>}/>
                <Route path="shop" element={<Shop/>}/>
            </Routes>
            {!isExcluded && <NavBar/>}
        </div>
    );
}


createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <BrowserRouter>
            <NavigationProvider>
                <AppRouter/>
            </NavigationProvider>
        </BrowserRouter>
    </ThemeProvider>
);

