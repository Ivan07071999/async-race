import { updateCar } from '../../utils/validator';
import {
  nextButtonEvent,
  previousButtonEvent,
  raceButtonEvent,
  generateCarsEvent,
  createNewCarEvent,
  winnersButtonEvent,
  garageButtonEvent,
  resetButtonEvent,
} from '../../utils/logicButtonsEvents';
import type { ButtonsType } from '../../types/garage';

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
  const selectCarButton = createButton('Select', 'button-select');
  const removeCarButton = createButton('Remove', 'button-remove');
  const A = createButton('A', 'button-car-logic');
  const B = createButton('B', 'button-car-logic');

  garageButton.addEventListener('click', () => garageButtonEvent());
  winnersButton.addEventListener('click', () => winnersButtonEvent());
  createCarButton.addEventListener('click', () => createNewCarEvent());
  updateCarButton.addEventListener('click', () => updateCar());
  generateCarsButton.addEventListener('click', () => generateCarsEvent());
  nextButton.addEventListener('click', () => nextButtonEvent());
  prevButton.addEventListener('click', () => previousButtonEvent());
  raceButton.addEventListener('click', () => raceButtonEvent());
  resetButton.addEventListener('click', () => resetButtonEvent());

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
    select: selectCarButton,
    remove: removeCarButton,
    a: A,
    b: B,
  };
}
