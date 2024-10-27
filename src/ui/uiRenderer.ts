import { Entity } from '../interfaces/entity.interface';
import { BeeComponent } from './beeComponent.js';

export class Renderer<T extends Entity> {
  private readonly container: HTMLDivElement;
  private readonly entities: Map<number, T> = new Map();

  constructor(swarnData: Map<number, T>) {
    this.entities = swarnData;
    this.container = this.getContainer();

    this.renderContent(this.entities);
  }

  onEntityHit(entity: T): void {
    const el = document.querySelector(`[data-id="${entity.id}"] span`);
    if (!el) {
      return;
    }
    this.animateOnHit(document.querySelector(`[data-id="${entity.id}"]`)!);
    el.textContent = `HP: ${entity.health}`;
  }

  onEntityKill(id: number): void {
    const el = document.querySelector(`[data-id="${id}"]`);

    el ? el.remove() : null;
  }

  onGameOver(gameOver: string): void {
    if (gameOver === 'queenDead') {
      document.querySelector('.swarn')?.classList.add('hide');
    }
  }

  private getContainer(): HTMLDivElement {
    const container = document.querySelector('.swarn') as HTMLDivElement;

    return container;
  }

  private renderContent(entities: Map<number, T>): void {
    entities.forEach((entity, key) => this.addEntityToUi( entity, key));
  }

  private addEntityToUi(entity: T, id: number): void {
    const uiElement = new BeeComponent(entity.health, id);

    this.container.querySelector(`.swarn__element--${entity.type} .content`)?.appendChild(uiElement.element);
  }

  private animateOnHit(element: HTMLDivElement): void {
    element.classList.add('zoom');
    setTimeout(() => element.classList.remove('zoom'), 500);
  }
}
