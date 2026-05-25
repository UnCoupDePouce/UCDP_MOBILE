import {Navigate, Outlet, Route, Routes, useLocation} from "react-router";
import Home from "../pages/Home/Home.tsx";
import {BottomBar} from "../components/BottomBar.tsx";
import Login from "../pages/Auth/Login.tsx";
import Register from "../pages/Auth/Register.tsx";
import ChatDetail from "../pages/Chat/ChatDetail.tsx";
import Chat from "../pages/Chat/Chat.tsx";
import RGPDPage from "../pages/Legals/RGPD.tsx";
import Profile from "../pages/Profile/Profile.tsx";
import TermsPage from "../pages/Legals/Terms.tsx";
import SettingsPage from "../pages/Settings/Settings.tsx";
import DetailMission from "../pages/Mission/DetailMission.tsx";
import {useEffect, useState} from "react";
import MissionSearchPage from "../pages/Search/MissionSearch.tsx";
import AddMissionPage from "../pages/Mission/AddMission.tsx";
import Candidate from "../pages/Candidate/Candidate.tsx";
import DetailProfile from "../pages/Profile/DetailProfile.tsx";
import SplashScreen from "../pages/SplashScreen/SplashScreen.tsx";

function ProtectedRoutes() {
    const [token, setToken] = useState(localStorage.getItem("hasToken"));

    useEffect(() => {
        const checkToken = () => {
            setToken(localStorage.getItem("hasToken"));
        };

        window.addEventListener("storage", checkToken);
        return () => window.removeEventListener("storage", checkToken);
    }, []);
    return token ? <Outlet/> : <Navigate to="/login" replace/>;
}

function ClientOnlyRoutes() {
    const role = localStorage.getItem("role");

    if (role === "PRESTATAIRE") {
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>;
}

export default function AppRouter() {
    const location = useLocation();
    const [showBottomBar, setShowBottomBar] = useState(true);

    const [isSplashVisible, setIsSplashVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSplashVisible(false);
        }, 2000); // 2 secondes
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const path = location.pathname;

        const isExcluded =
            path === "/login" ||
            path === "/register" ||
            path === "/notification" ||
            path === "/settings" ||
            path === "/profile/:id" ||
            path.startsWith("/auth") ||
            path.startsWith("/legal") ||
            path.startsWith("/chat/") ||
            path.startsWith("/mission/");

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShowBottomBar(!isExcluded);
        window.scrollTo(0, 0);

    }, [location.pathname]);

    if (isSplashVisible) {
        return <SplashScreen/>;
    }

    return (
        <>
            {showBottomBar ? <BottomBar/> : ""}

            <Routes>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="legal/rgpd" element={<RGPDPage/>}/>
                <Route path="legal/terms" element={<TermsPage/>}/>

                <Route element={<ProtectedRoutes/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="mission/:id" element={<DetailMission/>}/>
                    <Route element={<ClientOnlyRoutes/>}>
                        <Route path="add" element={<AddMissionPage/>}/>
                    </Route>
                    <Route path="candidate" element={<Candidate/>}/>
                    <Route path="chat" element={<Chat/>}/>
                    <Route path="chat/:id" element={<ChatDetail/>}/>
                    <Route path="user" element={<Profile/>}/>
                    <Route path="user/:id" element={<DetailProfile/>}/>
                    <Route path="settings" element={<SettingsPage/>}/>
                    <Route path="search" element={<MissionSearchPage/>}/>
                </Route>

                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </>
    )
}