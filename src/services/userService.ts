import type {
  AuthResponse,
  LoginCredentials,
  RegisterFormData,
} from "../types/auth";
import type { User } from "../types/user";

const getAuthHeaders = () => {
  const token = localStorage.getItem("hasToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const userService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await fetch("/local/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Identifiants invalides");
      }

      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error("Erreur serveur");
    }
  },

  logout: () => {
    localStorage.removeItem("hasToken");
    localStorage.removeItem("user_id");
    localStorage.removeItem("status");
    window.location.href = "/login";
  },

  register: async (
    formData: RegisterFormData,
    userType: string,
  ): Promise<AuthResponse> => {
    const response = await fetch("/local/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData, userType }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de l'inscription");
    }
    return response.json();
  },

  getById: async (id: string): Promise<User> => {
    const response = await fetch(`/local/api/user/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Utilisateur introuvable");
    return response.json();
  },
};
