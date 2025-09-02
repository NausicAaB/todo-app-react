export interface Todo{
    id: string;
    topic: string;
    dueDate: string;
    category: Category;
}
export type Category = "Travail" | 'Cegep' | 'Perso';
export type CategoryFilter = 'Tous' | Category;