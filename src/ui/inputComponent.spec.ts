/**
 * @jest-environment jsdom
 */

import { InputField } from './inputComponent';

describe('InputField', () => {
  let component: InputField;
  const placeholderText = 'Enter your text';

  beforeEach(() => {
    component = new InputField(placeholderText);
    document.body.appendChild(component.element); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create an input field with correct placeholder', () => {
    expect(component.element.placeholder).toBe(placeholderText);
  });

  it('should return trimmed value from the input field', () => {
    component.element.value = '  test value  ';
    expect(component.value).toBe('test value');
  });
});
