import { EventEmitter } from './utils/eventEmitter.js';
import { EventMap } from './interfaces/eventMap.interface';
import { QueenHitStrategy, WorkerHitStrategy, DroneHitStrategy } from './utils/hitStrategies.js';
import { HitStrategy } from './interfaces/hitStrategy.interface';
import { Entity } from './interfaces/entity.interface';
import { Bee, SwarnData } from './interfaces/bee.interface.js';

export class Swarn<T extends Entity> {
  private emitter: EventEmitter<EventMap>;
  readonly entities: Map<number, T> = new Map();

  private hitStrategies: Record<string, HitStrategy<T>> = {
    queen: new QueenHitStrategy() as HitStrategy<T>,
    worker: new WorkerHitStrategy() as HitStrategy<T>,
    drone: new DroneHitStrategy() as HitStrategy<T>,
  };

  constructor(swarnData: Map<number, T>) {
    this.entities = swarnData;
    this.emitter = EventEmitter.getInstance<EventMap>();
  }

  registerNewStrategy(type: keyof SwarnData, strategy: HitStrategy<T>): void {
    this.hitStrategies[type] = strategy;
  }

  hitBee(): void {
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
      this.handleEntityHit(updatedEntity, randomId, entity.type);
    }
  }

  private handleEntityHit(updatedEntity: T | null, entityId: number, entityType: string): void {
    if (!updatedEntity) {
      this.handleEntityDeath(entityId, entityType);
    } else {
      this.entities.set(entityId, updatedEntity);
      this.emitter.emit('hit', updatedEntity as Bee);
    }

    if (this.entities.size === 0) {
      this.emitter.emit('gameOver', 'allDead');
    }
  }

  private handleEntityDeath(entityId: number, entityType: string): void {
    if (entityType === 'queen') {
      this.entities.clear();
      this.emitter.emit('gameOver', 'queenDead');
      return;
    }
    this.entities.delete(entityId);
    this.emitter.emit('kill', entityId);
  }

  private getRandomEntityId(entityIds: number[]): number {
    return entityIds[Math.floor(Math.random() * entityIds.length)];
  }
}
