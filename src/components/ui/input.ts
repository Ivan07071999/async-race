type LabelAndInput = {
  createInput: HTMLInputElement;
  createLabel: HTMLInputElement;
  updateInput: HTMLInputElement;
  updateLabel: HTMLInputElement;
};

export function createInputElement(
  inputClass: string,
  inputID: string,
  inputType: string
): HTMLInputElement {
  const input = document.createElement('input');
  input.className = inputClass;
  input.type = inputType;
  input.id = inputID;
  return input;
}

export function createLabelAndInput(): LabelAndInput {
  const inputCreate = createInputElement('input', 'inputID-1', 'text');
  const inputUpdate = createInputElement('input', 'inputID-2', 'text');
  const labelCreate = createInputElement('inputColor', 'inputID-3', 'color');
  const labelUpdate = createInputElement('inputColor', 'inputID-4', 'color');

  return {
    createInput: inputCreate,
    createLabel: labelCreate,
    updateInput: inputUpdate,
    updateLabel: labelUpdate,
  };
}
