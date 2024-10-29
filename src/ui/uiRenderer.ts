import { Entity } from '../interfaces/entity.interface';
import { BeeComponent } from './beeComponent';
import { GameOver } from './gameOverComponent';

export class Renderer<T extends Entity> {
  private readonly container: HTMLDivElement;
  private readonly entities: Map<number, T> = new Map();

  constructor(swarnData: Map<number, T>) {
    this.entities = swarnData;
    this.container = this.getContainer();

    this.renderContent(this.entities);
  }

  renderContent(entities: Map<number, T>): void {
    entities.forEach((entity, key) => this.addEntityToUi(entity, key));
  }

  onEntityHit(entity: T, damage: number): void {
    const div = this.getEntityContainer(entity.id);
    if (!div) {
      throw new Error('Entity Container not found!');
    }
    div.querySelector('span')!.textContent = `HP: ${entity.health}`;
    this.animateOnHit(div, damage);
  }

  onEntityKill(id: number): void {
    const div = this.getEntityContainer(id);
    if (!div) {
      throw new Error('Entity Container not found!');
    }

    div.remove();
  }

  onGameOver(gameOver: string): void {
    if (gameOver === 'queenDead') {
      new GameOver('queenDead');
      this.clearEntities();
      return;
    }
    new GameOver('allDead');
    this.clearEntities();
  }

  private getContainer(): HTMLDivElement {
    const container = document.querySelector('.swarn') as HTMLDivElement;
    return container;
  }

  private addEntityToUi(entity: T, id: number): void {
    const uiElement = new BeeComponent(entity.health, id);
    this.container.querySelector(`.swarn__element--${entity.type} .content`)?.appendChild(uiElement.element);
  }

  ///check here
  private clearEntities(): void {
    this.container.querySelectorAll('.content').forEach(el => el.innerHTML = '');
  }

  private animateOnHit(element: HTMLDivElement, damage: number): void {
    element.classList.add('zoom');
    element.querySelector('.damage')!.textContent = `-${damage}`;

    setTimeout(() => {
      element.classList.remove('zoom');
      element.querySelector('.damage')!.textContent = '';
    }, 750);
  }

  private getEntityContainer(entityId: number): HTMLDivElement | null {
    return this.container.querySelector(`[data-id="${entityId}"]`);
  }
}
