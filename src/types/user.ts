export const Role = {
  ADMIN: "ADMIN",
  PRESTATAIRE: "PRESTATAIRE",
  CLIENT: "CLIENT",
} as const;

export type Role = typeof Role[keyof typeof Role];

export interface User {
  id: number;
  prenom: string;
  nom: string;
  raison_sociale?: string;
  mail: string;
  telephone: number;
  adresse: string;
  code_postal: number;
  ville: string;
  role: Role;
  credit: number;
}

export interface UserDTO {
  id: number;
  prenom: string;
  nom: string;
}