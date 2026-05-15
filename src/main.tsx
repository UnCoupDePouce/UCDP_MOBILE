import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import Login from "./pages/auth/login/Login.tsx";
import Register from "./pages/auth/register/Register.tsx";
import Home from "./pages/home/Home.tsx";
import { UnreadMessagesProvider } from "./providers/UnreadMessageProvider.tsx";
import { NavBar } from "./components/Navbar.tsx";
import { useMain } from "./useMain.ts";
import Profile from "./pages/profile/Profile.tsx";
import { NavigationProvider } from "./providers/NavigationProvider.tsx";
import { RGPDPage } from "./pages/legal/RGPD.tsx";
import { TermsPage } from "./pages/legal/Terms.tsx";
import { useState } from "react";
import OnboardingSlider from "./pages/home/OnBoardingSlider.tsx";
import SplashScreen from "./pages/home/SplashScreen.tsx";
import ChatDetail from "./pages/message/ChatDetail.tsx";
import ChatIndex from "./pages/message/ChatIndex.tsx";
import LayoutMessage from "./Layout/LayoutMessage.tsx";
import AddMission from "./pages/missions/AddMission.tsx";
import AllMission from "./pages/missions/AllMission.tsx";
import MissionDetail from "./pages/missions/MissionDetail.tsx";
import LandingAuth from "./pages/auth/LandingAuth.tsx";
import Layout from "./Layout/Layout.tsx";
import Candidatures from "./pages/candidatures/Candidature.tsx";

export default function AppRouter() {
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
      setShowOnboarding(false);
    } else {
      navigate('/auth');
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
    navigate('/auth');
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (showOnboarding) {
    return <OnboardingSlider onComplete={handleOnboardingComplete} />;
  }

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="auth" element={<LandingAuth />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="message" element={<LayoutMessage />}>
            <Route index element={<ChatIndex />} />
            <Route path=":id" element={<ChatDetail />} />
          </Route>
          <Route path="candidatures" element={<Candidatures />} />
          <Route path="mission" element={<AllMission />} />
          <Route path="mission/:id" element={<MissionDetail />} />
          <Route path="new/mission" element={<AddMission />} />
          <Route path="user" element={<Profile />} />
          <Route path="legal/rgpd" element={<RGPDPage />} />
          <Route path="legal/terms" element={<TermsPage />} />
        </Route>
      </Routes>
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <UnreadMessagesProvider>
      <NavigationProvider>
        <AppRouter />
      </NavigationProvider>
    </UnreadMessagesProvider>
  </BrowserRouter>,
);
