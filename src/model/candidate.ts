export type Statut = "EN_ATTENTE" | "VALIDE" | "REFUSE";

export interface MissionInfo {
  id_offre: string;
  titre: string;
  description: string;
  prix: number;
  localisation: string;
  date: string;
  statut: boolean;
}

export interface UtilisateurInfo {
  id_utilisateur: string;
  prenom: string;
  nom: string;
  mail: string;
  metier?: string;
}

export interface Candidate {
  id_candidature: number;
  statut: Statut;
  date_postulation: string;
  mission: MissionInfo;
  prestataire: UtilisateurInfo;
  client: UtilisateurInfo;
}
