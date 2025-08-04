import type { ICar } from '../store/garage/garageThunks';
// import createCarItem from '../features/garage/garageItem';
import { carsArray } from './data';
// import { disabledNextButton } from './disableButtons';
import {
  createCarsPage,
  garagePages,
} from '../features/garage/garageCreateCars';
import clearCarsContainer from './clear';

async function createNewCar() {
  const colorCar: HTMLInputElement | null =
    document.querySelector('#inputID-3');
  const carModel: HTMLInputElement | null =
    document.querySelector('#inputID-1');
  // const carList = document.querySelectorAll('.car-wrapper');
  // const carsContainer = document.querySelector('.form-car');

  if (
    colorCar instanceof HTMLInputElement &&
    carModel instanceof HTMLInputElement
  ) {
    const newCar: ICar = {
      name: carModel.value,
      color: colorCar.value,
      id: (await carsArray).length + 1,
    };

    clearCarsContainer();

    (await carsArray).push(newCar);
    createCarsPage(garagePages.PAGE_NUMBER);

    // if (carList.length < 7) {
    //   carsContainer?.appendChild(
    //     await createCarItem(newCar.name, newCar.color, (await carsArray).length)
    //   );
    // }
    carModel.value = '';
  }

  const carsLength = document.querySelector('h1') as HTMLElement;
  carsLength.textContent = `Garage(${(await carsArray).length})`;
  console.log(await carsArray);
}

export default createNewCar;
