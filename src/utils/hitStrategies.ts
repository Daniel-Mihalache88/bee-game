import { HitStrategy } from "../interfaces/hitStrategy.interface";
import { Bee } from "../interfaces/bee.interface";

enum DamagePerHit {
  Queen = 50,
  Worker = 40,
  Drone = 25,
}

export class QueenHitStrategy implements HitStrategy<Bee> {
  hit(bee: Bee): Bee | null {
    const updatedHealth = bee.health - DamagePerHit.Queen;

    return updatedHealth <= 0 ? null : { ...bee, health: updatedHealth };
  }
}

export class WorkerHitStrategy implements HitStrategy<Bee> {
  hit(bee: Bee): Bee | null {
    const updatedHealth = bee.health - DamagePerHit.Worker;

    return updatedHealth <= 0 ? null : { ...bee, health: updatedHealth };
  }
}

export class DroneHitStrategy implements HitStrategy<Bee> {
  hit(bee: Bee): Bee | null {
    const updatedHealth = bee.health - DamagePerHit.Drone;

    return updatedHealth <= 0 ? null : { ...bee, health: updatedHealth };
  }
}