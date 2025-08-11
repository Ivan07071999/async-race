import { garagePages } from '../features/garage/garageCreateCars';
import getCars, { type ICar } from '../store/garage/garageThunks';

export function disabledPreviewButton() {
  const buttonPreview = document.querySelector(
    '.button-prev'
  ) as HTMLButtonElement;

  buttonPreview.style.opacity = '0.5';
  buttonPreview.disabled = true;
  buttonPreview.style.pointerEvents = 'none';
  buttonPreview.style.cursor = 'default';
}

export function disabledNextButton() {
  const buttonNext = document.querySelector(
    '.button-next'
  ) as HTMLButtonElement;

  buttonNext.disabled = true;
  buttonNext.style.opacity = '0.5';
  buttonNext.style.cursor = 'default';
  buttonNext.style.pointerEvents = 'none';
}

export function enabledButtonPreview() {
  const buttonPreview = document.querySelector(
    '.button-prev'
  ) as HTMLButtonElement;

  buttonPreview.style.cursor = 'pointer';
  buttonPreview.style.opacity = '1.0';
  buttonPreview.disabled = false;
  buttonPreview.style.pointerEvents = 'auto';
}

export function enabledNextButton() {
  const buttonNext = document.querySelector(
    '.button-next'
  ) as HTMLButtonElement;

  buttonNext.disabled = false;
  buttonNext.style.opacity = '1.0';
  buttonNext.style.cursor = 'pointer';
  buttonNext.style.pointerEvents = 'auto';
}

export async function disabledButtons(page: number) {
  const allCars = await getCars<ICar[]>();
  let numberOfPages: number = Math.floor((allCars.length ?? 0) / 7);

  const lastPage: number =
    allCars.length % 7 === 0 ? (numberOfPages -= 1) : numberOfPages;

  switch (page) {
    case 0:
      disabledPreviewButton();
      break;
    case lastPage:
      disabledNextButton();
      break;
    default:
      enabledButtonPreview();
      enabledNextButton();
      break;
  }
}

export function disableHeaderForms() {
  const createForm = document.querySelector(
    '.header-form-middle'
  ) as HTMLButtonElement;
  const raceForm = document.querySelector(
    '.header-form-bottom'
  ) as HTMLButtonElement;

  createForm.style.pointerEvents = 'none';
  createForm.style.opacity = '0.5';

  raceForm.style.pointerEvents = 'none';
  raceForm.style.opacity = '0.5';
  disabledNextButton();
  disabledPreviewButton();
}

export function enableHeaderForms() {
  const createForm = document.querySelector(
    '.header-form-middle'
  ) as HTMLButtonElement;
  const raceForm = document.querySelector(
    '.header-form-bottom'
  ) as HTMLButtonElement;

  createForm.style.pointerEvents = 'auto';
  createForm.style.opacity = '1.0';

  raceForm.style.pointerEvents = 'auto';
  raceForm.style.opacity = '1.0';
  disabledButtons(garagePages.PAGE_NUMBER);
}

export function disableWinnersButton() {
  const winnersButton = document.querySelector(
    '.winners-button'
  ) as HTMLButtonElement;

  winnersButton.disabled = true;
  winnersButton.style.opacity = '0.5';
  winnersButton.style.pointerEvents = 'none';
}

export function enableWinnersButton() {
  const winnersButton = document.querySelector(
    '.winners-button'
  ) as HTMLButtonElement;

  winnersButton.disabled = false;
  winnersButton.style.opacity = '1.0';
  winnersButton.style.pointerEvents = 'auto';
}

export function disableGarageButton() {
  const garageButton = document.querySelector(
    '.garage-button'
  ) as HTMLButtonElement;

  garageButton.disabled = true;
  garageButton.style.opacity = '0.5';
  garageButton.style.pointerEvents = 'none';
}

export function enableGarageButton() {
  const garageButton = document.querySelector(
    '.garage-button'
  ) as HTMLButtonElement;

  garageButton.disabled = false;
  garageButton.style.opacity = '1.0';
  garageButton.style.pointerEvents = 'auto';
}

export function disableCarButtons(): void {
  const carContainers =
    document.querySelectorAll<HTMLDivElement>('.button-container');

  carContainers.forEach((container: HTMLDivElement): void => {
    container.style.pointerEvents = 'none';
    container.style.opacity = '0.5';
  });
}

export function enableCarButtons(): void {
  const carContainers =
    document.querySelectorAll<HTMLDivElement>('.button-container');

  carContainers.forEach((container: HTMLDivElement): void => {
    container.style.pointerEvents = 'auto';
    container.style.opacity = '1.0';
  });
}

export function disableRaseButton() {
  const raceButton = document.querySelector(
    '.button-race'
  ) as HTMLButtonElement;

  raceButton.disabled = true;
  raceButton.style.opacity = '0.5';
  raceButton.style.pointerEvents = 'none';
}

export function enableRaseButton() {
  const raceButton = document.querySelector(
    '.button-race'
  ) as HTMLButtonElement;

  raceButton.disabled = false;
  raceButton.style.opacity = '1.0';
  raceButton.style.pointerEvents = 'auto';
}
