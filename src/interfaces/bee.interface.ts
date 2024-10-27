export interface Category {
    count: number;
    health: number;
}

export interface SwarnData {
    queen: Category;
    worker: Category;
    drone: Category;
}

export interface Bee {
    id: number;
    type: string;
    health: number;
}
