import { EventMap } from '../interfaces/eventMap.interface';
import { EventEmitter } from '../utils/eventEmitter.js';
import { Button } from './buttonComponent.js';

export class GameOver {
  container: HTMLDivElement;
  button: Button;
  message: string;
  emitter: EventEmitter<EventMap>;

  constructor(message: string) {
    this.emitter = EventEmitter.getInstance<EventMap>();
    this.button = new Button('Restart', 'button');
    this.message = message;
    this.container = this.createOverlay();
    document.body.appendChild(this.container);
    this.button.element.addEventListener('click', () => this.onButtonClick());
  }

  private onButtonClick() {
    this.emitter.emit('restartGame', true);
    this.container.remove();
  }

  private createOverlay(): HTMLDivElement {
    const div = document.createElement('div');
    const header = document.createElement('h3');
    const message = document.createElement('h5');

    div.classList.add('game-over-overlay');
    header.textContent = 'Game Over';
    message.textContent = this.message === 'queenDead' ? 'The Queen is Dead!' : 'All Swarn members are dead!';

    div.appendChild(header);
    div.appendChild(message);
    div.appendChild(this.button.element);

    return div;
  }
}