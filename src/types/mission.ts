import type {User} from "./user.ts";

export interface Metier {
  id_metier: string;
  nom: string;
}

export interface Mission {
  id_offre: string;
  id_utilisateur: string;
  id_metier: string;
  titre: string;
  description: string;
  localisation: string;
  prix: number;
  date_offre: string;
  statut: boolean;
  utilisateur: User;
  metier: Metier;
}