export const menuItems = [
  { name: "Accueil", to: "/", icon: "home", roles: ["CLIENT", "PRESTATAIRE"] },
  { name: "Messages", to: "/message", icon: "chatbubble-ellipses", roles: ["CLIENT", "PRESTATAIRE"] },
  { name: "Créer", to: "/new/mission", icon: "add-circle", roles: ["CLIENT"] },
  { name: "Missions", to: "/mission", icon: "clipboard", roles: ["CLIENT", "PRESTATAIRE"] },
  { name: "Profil", to: "/user", icon: "person", roles: ["CLIENT", "PRESTATAIRE"] },
] as const;
