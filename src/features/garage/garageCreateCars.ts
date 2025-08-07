import { carsColors, carsModels, carsArray } from '../../utils/data';
import createCarItem from './garageItem';
import type { ICar } from '../../store/garage/garageThunks';
import {
  enabledNextButton,
  disabledButtons,
  enabledButtonPreview,
} from '../../utils/disableButtons';
// import clearCarsContainer from '../../utils/clear';

export const garagePages = {
  count: 0,
  PAGE_NUMBER: 0,
};

export async function createCarsPage(page: number) {
  const carsLength = document.querySelector('h1') as HTMLElement;
  carsLength.textContent = `Garage(${(await carsArray).length})`;

  const pageNumber = document.querySelector('h3') as HTMLElement;
  pageNumber.textContent = `Page #${garagePages.PAGE_NUMBER + 1}`;
  const clearedCarsContainer =
    document.querySelector<HTMLDivElement>('.form-car')!;
  const currentPAge = (await carsArray).slice(page * 7, page * 7 + 7);
  console.log(currentPAge);

  const carElements = await Promise.all(
    currentPAge.map(async (car, index) =>
      clearedCarsContainer.appendChild(
        await createCarItem(car.name, car.color, page * 7 + index + 1)
      )
    )
  );
  console.log(carElements, 'car element');
  if ((await carsArray).length > 7) {
    enabledNextButton();
  }

  if (garagePages.PAGE_NUMBER > 0) {
    enabledButtonPreview();
  }
  disabledButtons(garagePages.PAGE_NUMBER);
  return carElements;
}

function pushCarInArray(currentID: number): ICar {
  const randomIndex: number = Math.floor(Math.random() * 20);

  return {
    name: carsModels[randomIndex],
    color: carsColors[randomIndex],
    id: currentID,
  };
}

export async function pushCarsInCarsArray<T>(): Promise<T | undefined> {
  const addedCars: ICar[] = [];
  if (garagePages.count === 100) {
    garagePages.count = 0;
    return;
  }

  (await carsArray).push(pushCarInArray((await carsArray).length + 1));
  garagePages.count += 1;
  // const newCar = pushCarInArray((await carsArray).length + 1);

  // Отправляем на сервер
  const serverCar = await addCarToServer(newCar);
  addedCars.push(serverCar);
  // console.log(await carsArray);
  return pushCarsInCarsArray();
}

async function addCarToServer(car: ICar): Promise<ICar> {
  const serverUrl = 'http://localhost:3000';
  const url = new URL('/garage', serverUrl);

  try {
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Server responded with status ${response.status}: ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to add car to server:', error);
    throw error;
  }
}
