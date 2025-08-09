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
  let lastPage: number = Math.floor(
    ((await getCars<ICar[]>()).length ?? 0) / 7
  );
  // const newLastPage = lastPage % 7 !== 0 ? (lastPage -= 1) : lastPage;
  if ((await getCars<ICar[]>()).length % 7 === 0) {
    lastPage -= 1;
  }
  console.log(garagePages.PAGE_NUMBER, lastPage);
  // console.log(await carsArray);

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
