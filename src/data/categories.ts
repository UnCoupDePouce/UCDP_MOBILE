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
