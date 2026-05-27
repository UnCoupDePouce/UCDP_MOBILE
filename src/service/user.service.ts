import { request } from "./api.engine";
import type { Utilisateur } from "../model/user.ts";

export const UserService = {
  getById: (id: string): Promise<Utilisateur> => {
    return request<Utilisateur>("GET", "/user/:id", {
      pathParams: { id },
    });
  },
};
