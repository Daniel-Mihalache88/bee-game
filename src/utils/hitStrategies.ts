import { HitStrategy } from "../interfaces/hitStrategy.interface";
import { Bee } from "../interfaces/bee.interface";

enum DamagePerHit {
  Queen = 8,
  Worker = 10,
  Drone = 12
}

export class QueenHitStrategy implements HitStrategy<Bee> {
  hit(bee: Bee): { bee: Bee | null; damage: number } {
    const updatedHealth = bee.health - DamagePerHit.Queen;
    const updatedBee = updatedHealth <= 0 ? null : { ...bee, health: updatedHealth };

    return {
      bee: updatedBee,
      damage: DamagePerHit.Queen
    };
  }
}

export class WorkerHitStrategy implements HitStrategy<Bee> {
  hit(bee: Bee): { bee: Bee | null; damage: number } {
    const updatedHealth = bee.health - DamagePerHit.Worker;
    const updatedBee = updatedHealth <= 0 ? null : { ...bee, health: updatedHealth };

    return {
      bee: updatedBee,
      damage: DamagePerHit.Worker
    };
  }
}

export class DroneHitStrategy implements HitStrategy<Bee> {
  hit(bee: Bee): { bee: Bee | null; damage: number } {
    const updatedHealth = bee.health - DamagePerHit.Drone;
    const updatedBee = updatedHealth <= 0 ? null : { ...bee, health: updatedHealth };

    return {
      bee: updatedBee,
      damage: DamagePerHit.Drone
    };
  }
}