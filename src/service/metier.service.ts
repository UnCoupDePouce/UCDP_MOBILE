import { request } from "./api.engine";
import type { Metier } from "../model/metier.ts";

export const MetierService = {
  getAll: (): Promise<Metier[]> => {
    return request<Metier[]>("GET", "/metier");
  },
};
