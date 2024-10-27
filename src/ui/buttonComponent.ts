export class Button {
  private button: HTMLButtonElement;

  constructor(text: string, type: 'button' | 'submit' | 'reset') {
    this.button = document.createElement('button');
    this.button.type = type;
    this.button.textContent = text;
  }

  get element(): HTMLButtonElement {
    return this.button;
  }
}
