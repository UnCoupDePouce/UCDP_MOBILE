const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("hasToken")}`,
});

export const candidatureService = {
    getMine: async () => {
        const response = await fetch("/local/api/candidatures/me", {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Erreur de récupération");
        return response.json();
    },

    getByClient: async () => {
        const response = await fetch("/local/api/candidatures/client", {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Erreur de récupération");
        return response.json();
    },

    valider: async (id_candidature: number) => {
        const response = await fetch(`/local/api/candidatures/${id_candidature}/valider`, {
            method: "PATCH",
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Erreur lors de la validation");
        return response.json();
    },

    refuser: async (id_candidature: number) => {
        const response = await fetch(`/local/api/candidatures/${id_candidature}/refuser`, {
            method: "PATCH",
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Erreur lors du refus");
        return response.json();
    },
};