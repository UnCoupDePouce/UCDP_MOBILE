import { getAuthHeaders, request } from "./api.engine.ts";
import type { Candidate } from "../model/candidate.ts";

export const CandidateService = {
  getMine: (): Promise<Candidate[]> => {
    const userId = localStorage.getItem("user_id");
    const userRole = localStorage.getItem("role");

    return request<Candidate[]>("GET", "/candidatures/me", {
      headers: getAuthHeaders(),
      queryParams: {
        userId: userId,
        role: userRole,
      },
    });
  },

  apply: (id_offre: string, id_client: string) => {
    return request("POST", `/candidatures/apply`, {
      headers: getAuthHeaders(),
      body: {
        id_offre: id_offre,
        id_client: id_client,
      },
    });
  },

  valider: (id: string): Promise<Candidate> => {
    return request<Candidate>("PATCH", `/candidatures/${id}/valider`, {
      headers: getAuthHeaders(),
    });
  },

  refuser: (id: string): Promise<Candidate> => {
    return request<Candidate>("PATCH", `/candidatures/${id}/refuser`, {
      headers: getAuthHeaders(),
    });
  },
};
