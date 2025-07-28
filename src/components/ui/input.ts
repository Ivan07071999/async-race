type LabelAndInput = {
  createInput: HTMLInputElement;
  createLabel: HTMLLabelElement;
  updateInput: HTMLInputElement;
  updateLabel: HTMLLabelElement;
};

export function createInputElement(
  inputClass: string,
  inputID: string
): HTMLInputElement {
  const input = document.createElement('input');
  input.className = inputClass;
  input.type = 'text';
  input.id = inputID;
  return input;
}

export function createLabelElement(
  labelClass: string,
  inputID: string
): HTMLLabelElement {
  const label = document.createElement('label');
  label.className = labelClass;
  label.setAttribute('for', inputID);
  return label;
}

export function createLabelAndInput(): LabelAndInput {
  const inputCreate = createInputElement('input', 'inputID-1');
  const inputUpdate = createInputElement('input', 'inputID-2');
  const labelCreate = createLabelElement('label', 'inputID-1');
  const labelUpdate = createLabelElement('label', 'inputID-2');

  return {
    createInput: inputCreate,
    createLabel: labelCreate,
    updateInput: inputUpdate,
    updateLabel: labelUpdate,
  };
}
