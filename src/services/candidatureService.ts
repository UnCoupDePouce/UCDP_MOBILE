export const candidatureService = {
    getMine: async () => {
        const response = await fetch("/local/api/candidatures/me", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("hasToken")}`
            }
        });
        if (!response.ok) throw new Error("Erreur de récupération");
        return response.json();
    }
};