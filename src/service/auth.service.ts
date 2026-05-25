import {request} from "./api.engine";
import type {Utilisateur} from "../model/user.ts";

export interface AuthResponse {
    message: string;
    token: string;
    user: Utilisateur;
}

export const AuthService = {
    login: (email: string, password: string): Promise<AuthResponse> => {
        return request<AuthResponse>("POST", "/user/login", {
            body: {
                email: email,
                password: password
            }
        });
    },

    register: (formData: {
        nom: string;
        prenom: string;
        email: string;
        password: string;
        confirmPassword: string;
        telephone: string;
        adresse: string;
        codePostal: string;
        ville: string;
        raisonSociale: string;
        metiers: string[];
        role: string;
    }): Promise<AuthResponse> => {
        return request<AuthResponse>("POST", "/user/register", {
            body: {
                nom: formData.nom,
                prenom: formData.prenom,
                email: formData.email,
                password: formData.password,
                telephone: formData.telephone,
                adresse: formData.adresse,
                code_postal: formData.codePostal,
                ville: formData.ville,
                raison_sociale: formData.raisonSociale,
                metiers: formData.metiers,
                role: formData.role
            }
        });
    },
};