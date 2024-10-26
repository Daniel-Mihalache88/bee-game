import { EventEmmiter } from "./eventEmitter.js";
import { EventMap } from "./interfaces/eventMap.interface";
import { QueenHitStrategy, WorkerHitStrategy, DroneHitStrategy } from "./hitStrategies.js";
import { HitStrategy } from "./interfaces/hitStrategy.interface";
import { Entity } from "./interfaces/entity.interface";
import { Bee, SwarnData } from "./interfaces/bee.interface.js";

export class Swarn<T extends Entity> {
    readonly entities: Map<number, T> = new Map();
    private readonly emitter = EventEmmiter.getInstance<EventMap>();

    private hitStrategies: Record<string, HitStrategy<T>> = {
        queen: new QueenHitStrategy() as HitStrategy<T>,
        worker: new WorkerHitStrategy() as HitStrategy<T>,
        drone: new DroneHitStrategy() as HitStrategy<T>,
    };

    constructor(swarnData: Map<number, T>) {
        this.entities = swarnData;
    }

    registerStrategy(type: keyof SwarnData, strategy: HitStrategy<T>) {
        this.hitStrategies[type] = strategy;
    }

    hitBee() {
        const entityIds = Array.from(this.entities.keys());

        if (entityIds.length === 0) {
            return;
        }

        const randomId = this.getRandomEntityId(entityIds);
        const entity = this.entities.get(randomId);

        if (!entity) {
            return;
        }

        const strategy = this.hitStrategies[entity.type];

        if (strategy) {
            const updatedEntity = strategy.hit(entity);
            this.handleEntityHit(updatedEntity, randomId, entity.type as keyof SwarnData);
        }
    }

    private handleEntityHit(updatedEntity: T | null, entityId: number, entityType: keyof SwarnData) {
        if (!updatedEntity) {
            this.handleEntityDeath(entityId, entityType);
        } else {
            this.entities.set(entityId, updatedEntity); 
            this.emitter.emit("hit", updatedEntity as Bee);
        }
    
        if (this.entities.size === 0) {
            this.emitter.emit('gameOver', 'allDead');
        }
    }

    private handleEntityDeath(entityId: number, entityType: string) {
        if (entityType === "queen") {
            this.emitter.emit('gameOver', 'queenDead');
            return;
        }
        this.entities.delete(entityId);
        this.emitter.emit("kill", entityId);
    }

    private getRandomEntityId(entityIds: number[]): number {
        return entityIds[Math.floor(Math.random() * entityIds.length)];
    }
}