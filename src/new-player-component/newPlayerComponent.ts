import { Form } from '../ui/formComponent.js';
import { InputField } from '../ui/inputComponent.js';
import { Button } from '../ui/buttonComponent.js';
import { EventEmitter } from '../utils/eventEmitter.js';
import { EventMap } from '../interfaces/eventMap.interface.js';

export class NewPlayer {
  private form: Form;
  private inputField: InputField;
  private submitButton: Button;
  private emitter: EventEmitter<EventMap>;

  constructor() {
    this.emitter = EventEmitter.getInstance<EventMap>();
    this.form = new Form();
    this.inputField = new InputField('Player Name');
    this.submitButton = new Button('Create New Player', 'submit');

    this.renderNewPlayerOverlay();
    this.form.element.addEventListener('submit', this.submitHandler.bind(this));
  }

  private renderNewPlayerOverlay(): void {
    this.form.appendChild(this.inputField.element);
    this.form.appendChild(this.submitButton.element);

    document.body.appendChild(this.form.element);
    document.body.classList.add('no-overflow');
  }

  private submitHandler(event: Event): void {
    event.preventDefault();
    const playerName = this.inputField.value;

    if (playerName.length >= 3) {
      this.emitter.emit('playerCreated', playerName);
      this.form.element.remove();
      document.body.classList.remove('no-overflow');
    }
  }
}
