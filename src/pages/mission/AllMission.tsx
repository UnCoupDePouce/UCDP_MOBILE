import SelectedCategory from "../../components/SelectedCategory";
import { Header } from "../../components/navigation/Header";
import ProjectCard from "../../components/cards/ProjectCard";
import { useNavigate } from "react-router";

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

export default function AllMission() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
            <div className="mb-10">
                <Header title="Toutes les missions" />
                <main className="px-6 pt-2 pb-32">
                    {/* TODO: Mettre une barre de recherche ou d'autre options pour faciliter la navigation entre les cards */}
                    <SelectedCategory />
                    {/* TODO: Revoir l'affichage des cards, trop grande ? */}
                    <div className="flex flex-col gap-y-4">
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
                {/* TODO: Ajouter une pagination, faciliter l'expérience utilisateur */}
            </div>
        </div>
    )
}