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
}

export interface UserDTO {
  id: number;
  prenom: string;
  nom: string;
}

export interface UserPro {
  id: number;
  prenom: string;
  nom: string;
  raison_sociale: string;
  mail: string;
  telephone: number;
  adresse: string;
  code_postal: number;
  ville: string;
}

export interface UserNonPro {
  id: number;
  prenom: string;
  nom: string;
  mail: string;
  telephone: number;
  adresse: string;
  code_postal: number;
  ville: string;
}
