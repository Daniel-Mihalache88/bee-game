import { QueenHitStrategy, WorkerHitStrategy, DroneHitStrategy } from './hitStrategies';
import { Bee } from '../interfaces/bee.interface';

describe('Hit Strategies', () => {
  let swarn: Bee[];

  beforeEach(() => {
    swarn = [{ id: 1, type: 'queen', health: 100 },{ id: 2, type: 'worker', health: 100 },{ id: 3, type: 'drone', health: 100 }];
  });

  describe('Test QueenHitStrategy', () => {
    const damage = 8;
    it('should reduce health', () => {
      const queenStrategy = new QueenHitStrategy();
      const result = queenStrategy.hit(swarn[0]);
      const expected = { ...swarn[0], health: 92 };

      expect(result.bee).toEqual(expected);
      expect(result.damage).toBe(damage);
    });

    it('should kill bee', () => {
      swarn[0].health = damage;
      const queenStrategy = new QueenHitStrategy();
      const result = queenStrategy.hit(swarn[0]);

      expect(result.bee).toBe(null);
      expect(result.damage).toBe(damage);
    });
  });

  describe('WorkerHitStrategy', () => {
    const damage = 10;
    it('should reduce health', () => {
      const workerStrategy = new WorkerHitStrategy();
      const result = workerStrategy.hit(swarn[1]);
      const expected = { ...swarn[1], health: 90 };

      expect(result.bee).toEqual(expected);
      expect(result.damage).toBe(damage);
    });

    it('should kill bee', () => {
      swarn[1].health = damage;
      const workerStrategy = new WorkerHitStrategy();
      const result = workerStrategy.hit(swarn[1]);

      expect(result.bee).toBe(null);
      expect(result.damage).toBe(damage);
    });
  });

  describe('DroneHitStrategy', () => {
    const damage = 12;
    it('should reduce health', () => {
      const workerStrategy = new DroneHitStrategy();
      const result = workerStrategy.hit(swarn[2]);
      const expected = { ...swarn[2], health: 88 };

      expect(result.bee).toEqual(expected);
      expect(result.damage).toBe(damage);
    });

    it('should kill bee', () => {
      swarn[2].health = damage;
      const workerStrategy = new DroneHitStrategy();
      const result = workerStrategy.hit(swarn[2]);

      expect(result.bee).toBe(null);
      expect(result.damage).toBe(damage);
    });
  });
});
