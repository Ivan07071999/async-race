import {
  createCarsPage,
  garagePages,
} from '../../features/garage/garageCreateCars';
import { clearCarsContainer } from '../../utils/clear';
import { type ICar } from './garageThunks';
import getCars from './garageThunks';
import { updateHeadElementForRemove } from '../../utils/headElements';
import { PAGE_LENGTH } from '../../utils/data';

async function addCarToServer(carObject: {
  name: string;
  color: string;
}): Promise<void> {
  const serverUrl = 'http://localhost:3000';
  const url = new URL('/garage', serverUrl);

  const newCar = await carObject;

  try {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCar),
    }).then(response => response.json());
  } catch (error) {
    throw new Error(`'Failed to add car to server:'${error}`);
  }
}

export async function deleteServerCar(carId: number) {
  updateHeadElementForRemove();
  const carsContainer = document.querySelector('.form-car')!;
  const containerChilde: number = carsContainer?.childNodes.length;
  const cars = (await getCars<ICar[]>()).length;
  try {
    const serverUrl = 'http://localhost:3000';
    const url = new URL(`/garage/${carId}`, serverUrl);

    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }

    const data = await response.json();

    if (containerChilde < PAGE_LENGTH && cars > PAGE_LENGTH) {
      clearCarsContainer();
      createCarsPage(garagePages.PAGE_NUMBER);
    }
    return data;
  } catch (error) {
    throw new Error(`Error during deletion:${error}`);
  }
}

export default addCarToServer;
