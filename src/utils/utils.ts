import { Bee, SwarnData } from '../interfaces/bee.interface';

export class Utils {
  static getBeeSwarn() {
    const swarn: Map<number, Bee> = new Map();

    const initialData: SwarnData = {
      queen: { count: 1, health: 100 },
      worker: { count: 5, health: 75 },
      drone: { count: 8, health: 50 },
    };

    Object.entries(initialData).forEach(([type, { count, health }]) => {
      this.addBeesToSwarn(swarn, type as keyof SwarnData, count, health);
    });

    return swarn;
  }

  private static addBeesToSwarn(swarn: Map<number, Bee>, type: keyof SwarnData, count: number, health: number) {
    const startId = swarn.size;

    for (let i = 0; i < count; i++) {
      const bee: Bee = { id: startId + i, type: type, health };
      swarn.set(startId + i, bee);
    }
  }
}
