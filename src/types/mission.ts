import type { UserDTO } from "./user";

export interface Mission {
  id: number;
  name: string;
  description: string;
  date: Date;
  price: number;
  user: UserDTO;
  location: string;
  photo: string[];
}
