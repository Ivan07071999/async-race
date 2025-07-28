type ButtonsType = {
  winners: HTMLButtonElement;
  garage: HTMLButtonElement;
  race: HTMLButtonElement;
  reset: HTMLButtonElement;
  generate: HTMLButtonElement;
  create: HTMLButtonElement;
  update: HTMLButtonElement;
  next: HTMLButtonElement;
  prev: HTMLButtonElement;
};

export function createButton(
  text: string,
  classAdd: string
): HTMLButtonElement {
  const button = document.createElement('button');
  button.className = classAdd;
  button.textContent = text;
  return button;
}

export function createHeaderButtons(): ButtonsType {
  const winnersButton = createButton('To garage', 'garage-button');
  const garageButton = createButton('To winners', 'winners-button');
  const raceButton = createButton('Race', 'button-race');
  const resetButton = createButton('Reset', 'button-reset');
  const generateCarsButton = createButton(
    'Generate cars',
    'button-generateCars'
  );
  const createCarButton = createButton('Create', 'button-create');
  const updateCarButton = createButton('Update', 'button-update');
  const nextButton = createButton('Next', 'button-next');
  const prevButton = createButton('Prev', 'button-prev');

  return {
    winners: winnersButton,
    garage: garageButton,
    race: raceButton,
    reset: resetButton,
    generate: generateCarsButton,
    create: createCarButton,
    update: updateCarButton,
    next: nextButton,
    prev: prevButton,
  };
}
