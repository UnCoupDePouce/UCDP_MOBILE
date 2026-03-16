// const getAuthHeaders = () => {
//   const token = localStorage.getItem("hasToken");
//   return {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   };
// };
//
// export const projectService = {
//   getAll: async (): Promise<Project[]> => {
//     const response = await fetch("/api/projects");
//     if (!response.ok)
//       throw new Error("Erreur lors de la récupération des projets");

//     return response.json();
//   },

//   getById: async (id: string): Promise<Project> => {
//     const response = await fetch(`/api/projects/${id}`);
//     if (!response.ok) throw new Error("Projet introuvable");
//     return response.json();
//   },

//   create: async (projectData: Partial<Project>): Promise<Project> => {
//     const response = await fetch("/api/projects", {
//       method: "POST",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(projectData),
//     });

//     if (!response.ok) throw new Error("Erreur lors de la création du projet");
//     return response.json();
//   },

//   update: async (id: string, data: Partial<Project>): Promise<Project> => {
//     const response = await fetch(`/api/projects/${id}`, {
//       method: "PUT",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) throw new Error("Erreur lors de la modification");
//     return response.json();
//   },

//   delete: async (id: string): Promise<{ message: string }> => {
//     const response = await fetch(`/api/projects/${id}`, {
//       method: "DELETE",
//       headers: getAuthHeaders(),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Erreur lors de la suppression");
//     }

//     return response.json();
//   },
// };

// export const userService = {
//   login: async (
//     credentials: Pick<User, "email"> & { password: string },
//   ): Promise<AuthResponse> => {
//     const response = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(credentials),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || "Identifiants invalides");
//     }
//     return response.json();
//   },

//   register: async (userData: any): Promise<AuthResponse> => {
//     const response = await fetch("/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(userData),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || "Erreur lors de l'inscription");
//     }
//     return response.json();
//   },

//   getAll: async (): Promise<User[]> => {
//     const response = await fetch("/api/users");
//     if (!response.ok)
//       throw new Error("Erreur lors de la récupération des utilisateurs");
//     return response.json();
//   },

//   getById: async (id: string): Promise<User> => {
//     const response = await fetch(`/api/users/${id}`);
//     if (!response.ok) throw new Error("Utilisateur introuvable");
//     return response.json();
//   },

//   getMe: async (): Promise<User> => {
//     const response = await fetch("/api/users/my-profil", {
//       method: "GET",
//       headers: getAuthHeaders(),
//     });

//     if (!response.ok) throw new Error("Session expirée ou invalide");
//     return response.json();
//   },
// };

// export const favoriteService = {
//   getAll: async (token: string): Promise<Project[]> => {
//     if (token) {
//       const response = await fetch("/api/favorites", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) throw new Error("Erreur de récupération");

//       const data = await response.json();
//       return data.favorites || [];
//     }

//     const savedFavorites = localStorage.getItem("favorites");
//     const favoriteIds: string[] = savedFavorites
//       ? JSON.parse(savedFavorites)
//       : [];

//     if (favoriteIds.length > 0) {
//       const response = await fetch("/api/projects");
//       if (!response.ok) return [];

//       const allProjects: Project[] = await response.json();
//       return allProjects.filter((project) =>
//         favoriteIds.includes(String(project._id)),
//       );
//     }

//     return [];
//   },

//   clear: async () => {
//     localStorage.removeItem("favorites");
//   },

//   sync: async (projectIds: string[], token: string) => {
//     const response = await fetch("/api/favorites/sync", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ projectIds }),
//     });
//     if (!response.ok) throw new Error("Erreur de synchronisation");
//     return response.json();
//   },

//   add: async (id: string, token: string) => {
//     const response = await fetch(`/api/favorites/${id}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(
//         errorData.message || "Erreur lors de l'ajout aux favoris",
//       );
//     }
//     return response.json();
//   },
// };
