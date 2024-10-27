export class Form {
  private form: HTMLFormElement;

  constructor() {
    this.form = document.createElement('form');
    this.form.appendChild(this.createFormHeader());
    this.form.classList.add('new-player-overlay');
  }

  appendChild(element: HTMLElement): void {
    this.form.appendChild(element);
  }

  get element(): HTMLFormElement {
    return this.form;
  }

  private createFormHeader(): HTMLDivElement {
    const div = document.createElement('div');
    const span = document.createElement('span');
    const img = document.createElement('img');

    span.textContent = 'The Bee Game';
    img.src = 'src/assets/game_intro.png';
    img.alt = 'bee_icon';

    div.appendChild(img);
    div.appendChild(span);

    return div;
  }
}