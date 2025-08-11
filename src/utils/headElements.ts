import { garagePages } from '../features/garage/garageCreateCars';

export function updateHeadElement(): void {
  const carsLength = document.querySelector('h1') as HTMLElement;
  carsLength.textContent = `Garage(${(garagePages.carsNumber += 1)})`;
}

export function updateSubheadElement(): void {
  const pageNumber = document.querySelector('h3') as HTMLElement;
  pageNumber.textContent = `Page #${garagePages.PAGE_NUMBER + 1}`;
}

export function updateHeadElementForRemove(): void {
  const carsLength = document.querySelector('h1') as HTMLElement;
  carsLength.textContent = `Garage(${(garagePages.carsNumber -= 1)})`;
}
