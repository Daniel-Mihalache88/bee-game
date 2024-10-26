

export interface Category  {
    count: number,
    health: number
}

export interface SwarnData {
    queen: Category,
    workers: Category,
    drones: Category
}

export interface Bee {
    type: keyof SwarnData,
    health: number,
}