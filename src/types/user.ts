export interface User {
  id: number;
  name: string;
  surname: string;
  raison?: string;
  mail: string;
  phone: number;
  adresse: string;
  code: number;
  city: string;
}

export interface UserDTO {
  id: number;
  name: string;
  surname: string;
}

export interface UserPro {
  id: number;
  name: string;
  surname: string;
  raison: string;
  mail: string;
  phone: number;
  adresse: string;
  code: number;
  city: string;
}

export interface UserNonPro {
  id: number;
  name: string;
  surname: string;
  mail: string;
  phone: number;
  adresse: string;
  code: number;
  city: string;
}
