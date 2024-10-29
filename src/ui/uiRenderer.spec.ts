/**
 * @jest-environment jsdom
 */

import { Renderer } from './uiRenderer';
import { Bee } from '../interfaces/bee.interface';
import { GameOver } from './gameOverComponent';

jest.mock('./gameOverComponent', () => {
  return {
    GameOver: jest.fn()
  };
});

describe('Renderer', () => {
  let renderer: Renderer<Bee>;
  let swarnData: Map<number, Bee>;
  let container: HTMLDivElement;


  beforeEach(() => {
    container = document.createElement('div');
    container.classList.add('swarn');
    document.body.appendChild(container);

    const queenDiv = document.createElement('div');
    queenDiv.setAttribute('data-id', '1');
    queenDiv.classList.add('swarn__element--queen');
    queenDiv.innerHTML = '<div class="content"><span>HP: 100</span></div>';
    container.appendChild(queenDiv);

    const workerDiv = document.createElement('div');
    workerDiv.setAttribute('data-id', '2');
    workerDiv.classList.add('swarn__element--worker');
    workerDiv.innerHTML = '<div class="content"><span>HP: 75</span></div>';
    container.appendChild(workerDiv);

    swarnData = new Map([
      [1, { id: 1, health: 100, type: 'queen' }],
      [2, { id: 2, health: 75, type: 'worker' }],
    ]);

    renderer = new Renderer<Bee>(swarnData);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should clear entities', () => {
    renderer['clearEntities']();
    expect(container.querySelectorAll('.content')[0].innerHTML).toBe('');
  });

  it('should update health on hit', () => {
    const entity = { id: 1, health: 100, type: 'queen' };
    renderer.onEntityHit(entity, 10);
    expect(container.querySelector(`[data-id="1"] span`)!.textContent).toBe('HP: 100');
  });

  it('should throw error if incorrect entity.id', () => {
    const entity = { id: 999, health: 50, type: 'worker' };

    expect(() => {
      renderer.onEntityHit(entity, 10);
    }).toThrow('Entity Container not found!');
  });

  it('should remove entity on kill', () => {
    renderer.onEntityKill(1);

    expect(container.querySelector(`[data-id="1"]`)).toBe(null);
    expect(container.querySelector(`[data-id="2"]`)).not.toBe(null);
  });

  describe("Test onGameOver()", () => {
    it('should init new GameOver with "queenDead"', () => {
      const spy = GameOver;
      renderer['clearEntities'] = jest.fn();
      renderer.onGameOver('queenDead');

      expect(spy).toHaveBeenCalledWith('queenDead');
      expect(renderer['clearEntities']).toHaveBeenCalled();
    });

    it('should init new GameOver with "allDead"', () => {
      const spy = GameOver;
      renderer['clearEntities'] = jest.fn();
      renderer.onGameOver('allDead');

      expect(spy).toHaveBeenCalledWith('allDead');
      expect(renderer['clearEntities']).toHaveBeenCalled();
    })
  })
});
