/**
 * @jest-environment jsdom
 */
import { Button } from './buttonComponent';

describe('ButtonComponent', () => {
  let component: Button;
  const buttonText = 'Click me';
  const buttonType = 'button';

  beforeEach(() => {
    component = new Button(buttonText, buttonType);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a button element with the correct type and text', () => {
    expect(component.element.type).toBe(buttonType);
    expect(component.element.textContent).toBe(buttonText);
  });
});
