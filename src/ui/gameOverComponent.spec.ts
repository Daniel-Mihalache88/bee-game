/**
 * @jest-environment jsdom
 */
import { GameOver } from './gameOverComponent';
import { EventEmitter } from '../utils/eventEmitter';

jest.mock('../utils/eventEmitter', () => {
  return {
    EventEmitter: {
      getInstance: jest.fn().mockReturnValue({
        emit: jest.fn(),
      }),
    },
  };
});

describe('GameOverComponent', () => {
  let component: GameOver;

  beforeEach(() => {
    component = new GameOver('queenDead');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create gameOver overlay', () => {
    const overlay = document.querySelector('.game-over-overlay');
    const header = overlay?.querySelector('h3');
    const messageElement = overlay?.querySelector('h5');
    const buttonElement = overlay?.querySelector('button');

    expect(header?.textContent).toBe('Game Over'); 4
    expect(messageElement?.textContent).toBe('The Queen is Dead!');
    expect(buttonElement?.textContent).toBe('Restart');
  });

  it('should set "The Queen is Dead" message', () => {
    expect(component.container.getElementsByTagName('h5')[0].textContent).toBe('The Queen is Dead!');
  });

  it('should emit "restartGame" event and remove overlay', () => {
    const spy = EventEmitter.getInstance().emit;
    component.button.element.click();

    expect(spy).toHaveBeenCalledWith('restartGame', true);
    expect(document.body.contains(component.container)).toBe(false);
  });
});
