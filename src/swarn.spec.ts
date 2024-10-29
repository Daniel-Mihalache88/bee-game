import { Swarn } from './swarn';
import { EventEmitter } from './utils/eventEmitter';
import { HitStrategy } from './interfaces/hitStrategy.interface';
import { Entity } from './interfaces/entity.interface'

jest.mock('./utils/eventEmitter', () => {
  return {
    EventEmitter: {
      getInstance: jest.fn().mockReturnValue({
        emit: jest.fn(),
      }),
    },
  };
});
jest.mock('./utils/hitStrategies');

describe('Swarn', () => {
  let component: Swarn<Entity>;
  let mockEntities: Map<number, Entity>;
  let mockStrategies: Record<string, HitStrategy<Entity>>;

  beforeEach(() => {
    mockEntities = new Map<number, Entity>([
      [1, { id: 1, type: 'queen', health: 100 }],
      [2, { id: 2, type: 'worker', health: 50 }],
      [3, { id: 3, type: 'drone', health: 25 }],
    ]);

    mockStrategies = {
      queen: { hit: jest.fn().mockReturnValue({ bee: { id: 1, type: 'queen', health: 50 }, damage: 50 }) },
      worker: { hit: jest.fn().mockReturnValue({ bee: { id: 2, type: 'worker', health: 20 }, damage: 30 }) },
      drone: { hit: jest.fn().mockReturnValue({ bee: null, damage: 25 }) }
    };

    component = new Swarn<Entity>(mockEntities);
    component['hitStrategies'] = mockStrategies;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with provided entities', () => {
    expect(component.entities.size).toBe(3);
  });

  it('should register a new hit strategy', () => {
    const customStrategy: HitStrategy<Entity> = { hit: jest.fn() };
    component.registerNewStrategy('queen', customStrategy);

    expect(component['hitStrategies']['queen']).toBe(customStrategy);
  });

  describe("Test hitBee()", () => {
    it("should return if no entities", () => {
      component.entities.clear();
      const spy = jest.spyOn(component, 'hitBee');

      component.hitBee();

      expect(spy).toHaveReturned();
    });

    it("should return if no entity found", () => {
      const spy = jest.spyOn(component, 'hitBee');
      component['getRandomEntityId'] = jest.fn().mockReturnValueOnce(10);
      component.hitBee();

      expect(spy).toHaveReturned();
    });

    it("should call handleEntityHit()", () => {
      component['handleEntityHit'] = jest.fn();
      component['getRandomEntityId'] = jest.fn().mockReturnValueOnce(1);
      component.hitBee();

      expect(component['handleEntityHit']).toHaveBeenCalledWith({ id: 1, type: 'queen', health: 50 }, 50, 1, 'queen');
    });
  });

  describe("Test handleEntityHit()", () => {
    it("should call handleEntityDeath() if entity === null", () => {
      component['handleEntityDeath'] = jest.fn();
      component['handleEntityHit'](null, 50, 1, 'worker');

      expect(component['handleEntityDeath']).toHaveBeenCalledWith(1, 'worker');
    });

    it("should update entities and emitter should emit 'hit'", () => {
      const spy = EventEmitter.getInstance().emit;
      component['handleEntityHit']({ id: 1, type: 'queen', health: 50 }, 50, 1, 'queen');

      expect(component.entities.get(1)?.health).toEqual(50);
      expect(spy).toHaveBeenCalledWith('hit', { id: 1, type: 'queen', health: 50 }, 50);
    });
  });

  describe("Test handleEntityDeath()", () => {
    it("should clear entities if queen is dead", () => {
      component['handleEntityDeath'](1, 'queen');

      expect(component.entities.size).toEqual(0);
    });

    it("should remove entity from entities", () => {
      component['handleEntityDeath'](2, 'worker');

      expect(component.entities.size).toEqual(2);
    });

    it("should emit 'gameOver' if only the queen remains", () => {
      const spy = EventEmitter.getInstance().emit;
      component['handleEntityDeath'](2, 'worker');
      component['handleEntityDeath'](3, 'drone');

      expect(spy).toHaveBeenCalledWith('gameOver', 'allDead');
    });
  });
});
