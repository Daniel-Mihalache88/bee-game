/**
 * @jest-environment jsdom
 */

import * as SwarnModule from './swarn';
import { GameController } from './gameController';
import { Bee } from './interfaces/bee.interface';

jest.mock('./utils/eventEmitter', () => ({
  EventEmitter: {
    getInstance: jest.fn().mockReturnValue({
      emit: jest.fn(),
      on: jest.fn(),
    }),
  },
}));

jest.mock('./ui/buttonComponent', () => ({
  Button: jest.fn().mockImplementation(() => ({
    element: document.createElement('button'),
  })),
}));

jest.mock('./ui/uiRenderer');
jest.mock('./new-player-component/newPlayerComponent');
jest.mock('./swarn', () => ({
  Swarn: jest.fn().mockImplementation(() => ({
    entities: new Map(),
    hitBee: jest.fn(),
  })),
}));

describe('GameController', () => {
  let gameController: GameController;
  let mockSwarn: SwarnModule.Swarn<Bee>;
  beforeEach(() => {
    const playerDataElement = document.createElement('div');
    playerDataElement.classList.add('player-data__name');
    playerDataElement.innerHTML = '<span></span>';
    document.body.appendChild(playerDataElement);

    const gameControlElement = document.createElement('section');
    gameControlElement.classList.add('game-control');
    document.body.appendChild(gameControlElement);

    gameController = new GameController();
    mockSwarn = new SwarnModule.Swarn(new Map());
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('should call handleBeeHit when the hit button is clicked', () => {
    gameController['handleBeeHit'] = jest.fn();
    gameController['hitButton'].element.click();

    expect(gameController['handleBeeHit']).toHaveBeenCalled();
  });

  it('should call initNewSwarn on onRestartGame', () => {
    const initNewSwarnSpy = jest.spyOn(gameController as any, 'initNewSwarn');

    gameController['onRestartGame']();
    expect(mockSwarn.hitBee).not.toHaveBeenCalled();
    expect(initNewSwarnSpy).toHaveBeenCalled();
  });
});
