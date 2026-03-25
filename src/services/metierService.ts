import type {Metier} from "../types/metier.ts";

export const metierService = {
    getAll: async (): Promise<Metier[]> => {
        const response = await fetch(`/local/api/metier`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des métiers");
        return response.json();
    }
}