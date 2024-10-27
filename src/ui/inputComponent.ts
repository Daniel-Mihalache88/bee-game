export class InputField {
  private input: HTMLInputElement;

  constructor(placeholder: string) {
    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = placeholder;
    this.input.classList.add('input');
  }

  get element(): HTMLInputElement {
    return this.input;
  }

  get value(): string {
    return this.input.value.trim();
  }
}