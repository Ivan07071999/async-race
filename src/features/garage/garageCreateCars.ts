import { carsColors, carsModels, carsArray } from '../../utils/data';
import createCarItem from './garageItem';
import getCars, { type ICar } from '../../store/garage/garageThunks';

import {
  enabledNextButton,
  disabledButtons,
  enabledButtonPreview,
} from '../../utils/disableButtons';

export const garagePages = {
  count: 0,
  PAGE_NUMBER: 0,
  carsNumber: 4,
};

export async function createCarsPage(page: number) {
  const pageNumber = document.querySelector('h3') as HTMLElement;
  pageNumber.textContent = `Page #${garagePages.PAGE_NUMBER + 1}`;

  const clearedCarsContainer =
    document.querySelector<HTMLDivElement>('.form-car')!;

  const data: ICar[] = await getCars();

  const currentPAge: ICar[] = (await data).slice(page * 7, page * 7 + 7);
  console.log(currentPAge);

  const carElements = await Promise.all(
    currentPAge.map(async car =>
      clearedCarsContainer.appendChild(
        await createCarItem(car.name, car.color, car.id)
      )
    )
  );
  // console.log(carElements, 'car element');
  if ((await data).length > 7) {
    enabledNextButton();
  }

  if (garagePages.PAGE_NUMBER > 0) {
    enabledButtonPreview();
  }
  disabledButtons(garagePages.PAGE_NUMBER);
  return carElements;
}

export async function addCarToServer(carObject: {
  name: string;
  color: string;
}): Promise<void> {
  const serverUrl = 'http://localhost:3000';
  const url = new URL('/garage', serverUrl);

  // const newCar = await createNewCar();
  const newCar = await carObject;
  console.log(await newCar);

  try {
    fetch(url, {
      method: 'POST', // Метод для добавления данных
      headers: {
        'Content-Type': 'application/json', // Указываем формат данных
      },
      body: JSON.stringify(newCar), // Преобразуем объект в JSON
    })
      .then(response => response.json())
      .then(data => {
        console.log('Успешно добавлено:', data);
      });
    console.log(await carsArray, 'newArr');
  } catch (error) {
    console.error('Failed to add car to server:', error);
    throw error;
  }
}

function createRandomCar(): {
  name: string;
  color: string;
} {
  const randomIndex: number = Math.floor(Math.random() * 20);

  const carsLength = document.querySelector('h1') as HTMLElement;
  carsLength.textContent = `Garage(${(garagePages.carsNumber += 1)})`;

  return {
    name: carsModels[randomIndex],
    color: carsColors[randomIndex],
  };
}

export async function generate100Cars<T>(): Promise<T | undefined> {
  if (garagePages.count === 100) {
    garagePages.count = 0;
    return;
  }

  addCarToServer(createRandomCar());
  garagePages.count += 1;

  return generate100Cars();
}

export function handlePageLoad(): void {
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  createCarsPage(garagePages.PAGE_NUMBER);
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
}
