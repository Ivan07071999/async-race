import { startRace } from '../features/engine/engineControls';
import {
  disableWinnersButton,
  disabledNextButton,
  disabledPreviewButton,
  disableHeaderForms,
  disableCarButtons,
  disabledButtons,
  enabledNextButton,
  disableGarageButton,
  enableHeaderForms,
  enableWinnersButton,
  enableGarageButton,
  disableRaseButton,
  enableRaseButton,
} from './disableButtons';
import {
  garagePages,
  createCarsPage,
  generate100Cars,
} from '../features/garage/garageCreateCars';
import { clearCarsContainer, clearHeads } from './clear';
import addCarToServer from '../store/garage/garageSlice';
import getCars, { type ICar } from '../store/garage/garageThunks';
import createNewCar from './formatters';
import openWinnersPage from '../features/winners/winnersPage';
import { removeWinnersEvents } from './removeEventListener';

export function resetButtonEvent() {
  startRace('button-stop');
  enableRaseButton();
}

export function raceButtonEvent(): void {
  startRace('button-start');
  disableWinnersButton();
  disabledNextButton();
  disabledPreviewButton();
  disableHeaderForms();
  disableCarButtons();
  disableRaseButton();
}

export function previousButtonEvent(): void {
  garagePages.PAGE_NUMBER -= 1;
  clearCarsContainer();
  createCarsPage(garagePages.PAGE_NUMBER);
  disabledButtons(garagePages.PAGE_NUMBER);
}

export function nextButtonEvent(): void {
  garagePages.PAGE_NUMBER += 1;
  clearCarsContainer();
  createCarsPage(garagePages.PAGE_NUMBER);
  disabledButtons(garagePages.PAGE_NUMBER);
}

export function generateCarsEvent(): void {
  generate100Cars()
    .then(() => clearCarsContainer())
    .then(() => createCarsPage(garagePages.PAGE_NUMBER))
    .then(() => {
      enabledNextButton();
    })
    .catch(error => {
      throw error;
    });
}

export function createNewCarEvent(): void {
  createNewCar().then(async newCar => {
    if (newCar) {
      await addCarToServer(newCar);
      if ((await getCars<ICar[]>()).length > 7) enabledNextButton();
    }
  });
}

export function winnersButtonEvent(): void {
  removeWinnersEvents();
  clearCarsContainer();
  createCarsPage(garagePages.PAGE_NUMBER);
  enableHeaderForms();
  disableGarageButton();
  enableWinnersButton();
  enableRaseButton();
  clearHeads();
}

export function garageButtonEvent(): void {
  openWinnersPage();
  disableHeaderForms();
  disableWinnersButton();
  enableGarageButton();
  clearHeads();
}
