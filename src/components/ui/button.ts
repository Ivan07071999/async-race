import { updateCar } from '../../utils/validator';
import {
  generate100Cars,
  createCarsPage,
  garagePages,
  addCarToServer,
} from '../../features/garage/garageCreateCars';
import clearCarsContainer from '../../utils/clear';
import { disabledButtons, enabledNextButton } from '../../utils/disableButtons';
import startRace from '../../features/engine/engineControls';
import createNewCar from '../../utils/formatters';
import { type ICar } from '../../store/garage/garageThunks';
import getCars from '../../store/garage/garageThunks';
import openWinnersPage from '../../features/winners/winnersPage';

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
  select: HTMLButtonElement;
  remove: HTMLButtonElement;
  a: HTMLButtonElement;
  b: HTMLButtonElement;
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
  const selectCarButton = createButton('Select', 'button-select');
  const removeCarButton = createButton('Remove', 'button-remove');
  const A = createButton('A', 'button-car-logic');
  const B = createButton('B', 'button-car-logic');

  garageButton.addEventListener('click', () => openWinnersPage());

  createCarButton.addEventListener('click', () =>
    createNewCar().then(async newCar => {
      if (newCar) {
        await addCarToServer(newCar);
        if ((await getCars<ICar[]>()).length > 7) enabledNextButton();
      }
    })
  );
  updateCarButton.addEventListener('click', () => updateCar());
  generateCarsButton.addEventListener('click', () => {
    generate100Cars()
      .then(() => clearCarsContainer())
      .then(() => createCarsPage(garagePages.PAGE_NUMBER))
      .then(() => {
        console.log('Все операции выполнены успешно');
        enabledNextButton();
      })
      .catch(error => {
        console.error('Произошла ошибка:', error);
      });
  });

  nextButton.addEventListener('click', () => {
    clearCarsContainer();
    garagePages.PAGE_NUMBER += 1;
    createCarsPage(garagePages.PAGE_NUMBER);
    disabledButtons(garagePages.PAGE_NUMBER);
  });

  prevButton.addEventListener('click', () => {
    clearCarsContainer();
    garagePages.PAGE_NUMBER -= 1;
    createCarsPage(garagePages.PAGE_NUMBER);
    disabledButtons(garagePages.PAGE_NUMBER);
  });

  raceButton.addEventListener('click', () => startRace('button-start'));
  resetButton.addEventListener('click', () => startRace('button-stop'));

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
