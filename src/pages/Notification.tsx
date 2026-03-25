import { Header } from "../components/navigation/Header.tsx";
import NotificationCard from "../components/cards/NotificationCard.tsx";

export default function Notification() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
      <Header title={"Notifications"} showButton={true} />

      <main className="flex-1 px-6 pt-2 pb-32">
        <div className="flex flex-col gap-y-4">
          <NotificationCard
            title="Nouvelle mission"
            desc="Une mission de plomberie vient d'être publiée près de chez vous."
            time="Il y a 2 min"
            icon="flash"
          />
          <NotificationCard
            title="Message reçu"
            desc="Gérard vous a envoyé un message concernant la mission 'Fuite évier'."
            time="Il y a 1h"
            icon="chatbubble"
          />
          <NotificationCard
            title="Mission validée"
            desc="Félicitations ! Votre candidature pour la peinture a été retenue."
            time="Hier"
            icon="checkmark-circle"
          />
        </div>
      </main>
    </div>
  );
}
