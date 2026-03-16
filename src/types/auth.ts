import type { User } from "./user";

export interface AuthResponse {
    message: string;
    token: string;
    user: User;
}

export interface LoginCredentials {
    mail: string;
    password: string;
}