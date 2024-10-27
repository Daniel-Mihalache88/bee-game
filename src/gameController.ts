import { Bee } from './interfaces/bee.interface.js';
import { Swarn } from './swarn.js';
import { Utils } from './utils/utils.js';
import { NewPlayer } from './new-player-component/newPlayerComponent.js';
import { EventEmitter } from './utils/eventEmitter.js';
import { EventMap } from './interfaces/eventMap.interface.js';
import { Renderer } from './ui/uiRenderer.js';
import { Button } from './ui/buttonComponent.js';

export class GameController {
  private hitButton = new Button('Hit', 'button');
  private renderer: Renderer<Bee>;
  private emitter: EventEmitter<EventMap>;
  private swarn: Swarn<Bee> | null = null;

  constructor() {
    this.emitter = EventEmitter.getInstance<EventMap>();
    this.handlePlayer();
    this.initGame();
    this.initHitButton();
    this.initEventListeners();
    this.renderer = new Renderer(this.swarn!.entities);
  }

  private initEventListeners(): void {
    this.emitter.on('hit', (data) => this.updateUiOnBeeHit(data));
    this.emitter.on('kill', (id) => this.updateUiOnBeeKill(id));
    this.emitter.on('gameOver', (data) => this.updateUIOnGameOver(data));
    this.emitter.on('playerCreated', (data) => this.setPlayerName(data));
    this.emitter.on('restartGame', () => this.onRestartGame());
  }

  private initHitButton(): void {
    const buttonWrapper = document.querySelector('.game-control') as HTMLDivElement;
    buttonWrapper.appendChild(this.hitButton.element);

    this.hitButton.element.addEventListener('click', () => this.handleBeeHit());
  }

  private handleBeeHit(): void {
    this.swarn!.hitBee();
    localStorage.setItem('beeGame', JSON.stringify(Array.from(this.swarn!.entities)));
  }

  private updateUiOnBeeHit(bee: Bee): void {
    this.renderer.onEntityHit(bee);
  }

  private updateUiOnBeeKill(id: number): void {
    this.renderer.onEntityKill(id);
  }

  private updateUIOnGameOver(gameOver: string): void {
    this.renderer.onGameOver(gameOver);
  }

  private setPlayerName(name: string): void {
    localStorage.setItem('playerName', name);
    document.querySelector('.player-data__name span')!.textContent = name;
  }

  private handlePlayer(): void {
    const player = localStorage.getItem('playerName');

    if (!player) {
      new NewPlayer();
      return;
    }

    document.querySelector('.player-data__name span')!.textContent = player;
  }

  private initGame(): void {
    const gameInProgress = localStorage.getItem('beeGame');
    if (!gameInProgress) {
      this.initNewSwarn();

      return;
    }
    const savedData: Map<number, Bee> = new Map(JSON.parse(gameInProgress));

    this.swarn = new Swarn(savedData);
  }

  private onRestartGame() {
    this.initNewSwarn();
    localStorage.setItem('beeGame', JSON.stringify(Array.from(this.swarn!.entities)));
    this.renderer.renderContent(this.swarn!.entities);
  }

  private initNewSwarn():void {
    const newData = Utils.getBeeSwarn();
    this.swarn = new Swarn(newData);
  }
}
