import { getAuthHeaders, request } from "./api.engine";
import type { Mission } from "../model/mission.ts";

export const MissionService = {
  getAll: (): Promise<Mission[]> => {
    return request<Mission[]>("GET", "/offre");
  },

  search: (research: string): Promise<Mission[]> =>{
    return request<Mission[]>("POST", "/offre/search", {
      body: {
        research: research
      }
    })
  },

  getById: (id: string): Promise<Mission> => {
    return request<Mission>("GET", "/offre/:id", {
      pathParams: { id },
    });
  },

  create: (formData: {
    profession: string;
    location: string;
    title: string;
    description: string;
    images: string[];
  }): Promise<Mission> => {
    return request<Mission>("POST", "/offre", {
      headers: getAuthHeaders(),
      body: {
        id_metier: formData.profession,
        localisation: formData.location,
        titre: formData.title,
        description: formData.description,
        prix: 0,
      },
    });
  },
};
