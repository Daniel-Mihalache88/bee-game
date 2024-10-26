import { Entity } from "./entity.interface";

export interface HitStrategy<T extends Entity> {
    hit(bee: T): T | null;
}