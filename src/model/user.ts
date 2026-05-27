export const Role = {
  ADMIN: "ADMIN",
  PRESTATAIRE: "PRESTATAIRE",
  CLIENT: "CLIENT",
} as const;

export type UserRole = (typeof Role)[keyof typeof Role];

export interface Utilisateur {
  id_utilisateur: string;
  prenom: string;
  nom: string;
  mail: string;
  telephone: number;
  adresse: string;
  code_postal: number;
  ville: string;
  raison_sociale?: string;
  role: UserRole;
  date_creation: string;
}

export interface UserDTO {
  id: number;
  prenom: string;
  nom: string;
}
