import type {Mission} from "../types/mission.ts";

const getAuthHeaders = () => {
    const token = localStorage.getItem("hasToken");
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export const missionService = {
    getAll: async (): Promise<Mission[]> => {
        const response = await fetch(`/local/api/offre`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Erreur lors de la récupération des missions");
        return response.json();
    },


    getById: async (id: string): Promise<Mission> => {
        const response = await fetch(`/local/api/offre/${id}`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Mission introuvable");
        return response.json();
    },


    create: async (data: Partial<Mission>): Promise<Mission> => {
        const response = await fetch(`/local/api/offre/`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Erreur lors de la création");
        return response.json();
    },


    update: async (id: string, data: Partial<Mission>): Promise<Mission> => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Erreur lors de la modification");
        return response.json();
    },

    requestAccess: async (id_offre: string, message_presta: string) => {
        const response = await fetch(`${API_URL}/postuler`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ id_offre, message_presta }),
        });
        if (!response.ok) throw new Error("Erreur lors de la postulation");
        return response.json();
    },

    close: async (id: string): Promise<void> => {
        const response = await fetch(`${API_URL}/${id}/fermer`, {
            method: "PATCH",
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Erreur lors de la clôture");
    },

    delete: async (id: string): Promise<void> => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Erreur lors de la suppression");
    }
};