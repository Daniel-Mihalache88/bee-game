
export class BeeComponent {
  private beeContainer: HTMLDivElement;

  constructor(health: number, id: number) {
    this.beeContainer = this.createElement(health, id);
  }

  get element(): HTMLDivElement {
    return this.beeContainer;
  }

  private createElement(initialHealth: number, id: number): HTMLDivElement {
    const div = document.createElement('div');
    const image = this.createImage();
    const damageContainer = this.createDamageContainer();
    const healthText = this.createHealthText(initialHealth);

    div.classList.add('content__item');
    div.setAttribute('data-id', id.toString());
    div.appendChild(image);
    div.appendChild(healthText);
    div.appendChild(damageContainer);

    return div;
  }

  private createDamageContainer(): HTMLDivElement {
    const div = document.createElement('div');
    div.classList.add('damage');

    return div;
  }

  private createImage(): HTMLImageElement {
    const img = document.createElement('img');
    img.src = 'src/assets/bee_icon.png';
    img.alt = 'bee_icon';

    return img;
  }

  private createHealthText(health: number): HTMLSpanElement {
    const span = document.createElement('span');
    span.textContent = `HP: ${health}`;

    return span;
  }
}