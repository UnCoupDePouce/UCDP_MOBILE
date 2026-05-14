export const excludedRoutes = [
  "/notification",
  "/auth",
  "/login",
  "/register",
  "/message/:id",
  "/mission/:id",
];

import type { UserRole } from "../types/user.ts";

export interface MenuItem {
  name: string;
  to: string;
  icon: string;
  roles?: UserRole[];
}

export const menuItems = [
  {
    name: "Accueil",
    to: "/",
    icon: "home",
    roles: ["CLIENT", "PRESTATAIRE", "ADMIN"],
  },
  {
    name: "Messages",
    to: "/message",
    icon: "chatbubble-ellipses",
    roles: ["CLIENT", "PRESTATAIRE", "ADMIN"],
  },
  {
    name: "Créer",
    to: "/new/mission",
    icon: "add-circle",
    roles: ["CLIENT", "ADMIN"],
  },
  {
    name: "Missions",
    to: "/candidatures",
    icon: "clipboard",
    roles: ["CLIENT", "PRESTATAIRE", "ADMIN"],
  },
  {
    name: "Profil",
    to: "/user",
    icon: "person",
    roles: ["CLIENT", "PRESTATAIRE", "ADMIN"],
  },
];

export interface Category {
  id: string;
  name: string;
  iconName: string;
}

const categories: Category[] = [
  { id: "1", name: "Tuyauterie", iconName: "water" },
  { id: "2", name: "Carrelage", iconName: "construct" },
  { id: "3", name: "Peinture", iconName: "color-palette" },
  { id: "4", name: "Électricité", iconName: "flash" },
  { id: "5", name: "Menuiserie", iconName: "hammer" },
];

export default categories;

export const mainRoutes = [
  "/",
  "/mission",
  "/message",
  "/user",
  "/new/mission",
];

export type NavStackItem = {
  path: string;
};

export class NavigationStack {
  private stack: NavStackItem[] = [];

  push(path: string) {
    if (this.current() === path) return;

    if (mainRoutes.includes(path)) {
      this.stack = [{ path }];
    } else {
      this.stack.push({ path });
    }
  }

  getPreviousPath(): string {
    if (this.stack.length >= 2) {
      return this.stack[this.stack.length - 2].path;
    }
    return "/";
  }

  pop() {
    if (this.stack.length > 1) {
      this.stack.pop();
    }
  }

  current(): string | undefined {
    return this.stack[this.stack.length - 1]?.path;
  }
}

export const navStack = new NavigationStack();
