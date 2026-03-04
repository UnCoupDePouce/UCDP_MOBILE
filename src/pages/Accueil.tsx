import { HomeHeader } from "../components/navigation/HomeHeader.tsx";
import { useNavigate } from "react-router";
import ProjectCard from "../components/cards/ProjectCard.tsx";
import { NavLink } from "react-router";
import Message from "../components/Message.tsx";

const MISSIONS = [
    {
        id: "101",
        title: "Réparation fuite évier",
        date: "Aujourd'hui",
        category: "Plomberie",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200&auto=format&fit=crop",
        location: "Toulouse",
        author: "Gérard"
    },
    {
        id: "102",
        title: "Installation prise électrique",
        date: "Demain",
        category: "Électricité",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=200&auto=format&fit=crop",
        location: "Toulouse",
        author: "Gérard"
    },
    {
        id: "103",
        title: "Peinture chambre 15m²",
        date: "22 Janv.",
        category: "Peinture",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=200&auto=format&fit=crop",
        location: "Toulouse",
        author: "Gérard"
    },
];

export default function Accueil() {
    const navigate = useNavigate();

    return (
        <main className="px-6 pb-28 min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
            <HomeHeader />
            <Message data=""/>

            <div className="flex flex-col gap-y-4">
                <div className="flex justify-between">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-neutral-600 mb-1 ml-1">
                        Missions à proximité
                    </h2>
                    <NavLink to="/all"
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition duration-150 dark:text-neutral-600 mb-1 ml-1"
                    >
                        Voir tous
                    </NavLink>
                </div>

                {MISSIONS.map((mission) => (
                    <ProjectCard
                        key={mission.id}
                        title={mission.title}
                        category={mission.category}
                        date={mission.date}
                        image={mission.image}
                        infoLeft={mission.location}
                        infoRight={mission.author}
                        onClick={() => navigate(`/mission/${mission.id}`)}
                    />
                ))}
            </div>
        </main>
    );
}