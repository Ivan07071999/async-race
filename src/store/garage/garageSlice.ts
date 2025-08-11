import {
  createCarsPage,
  garagePages,
} from '../../features/garage/garageCreateCars';
import { clearCarsContainer } from '../../utils/clear';
import { type ICar } from './garageThunks';
import getCars from './garageThunks';
import { updateHeadElementForRemove } from '../../utils/headElements';

async function addCarToServer(carObject: {
  name: string;
  color: string;
}): Promise<void> {
  const serverUrl = 'http://localhost:3000';
  const url = new URL('/garage', serverUrl);

  const newCar = await carObject;
  console.log(await newCar);

  try {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCar),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Успешно добавлено:', data);
      });
  } catch (error) {
    console.error('Failed to add car to server:', error);
    throw error;
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
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    if (response.status === 204) {
      console.log(`Объект с ID=${carId} успешно удален (статус 204)`);
      return null;
    }

    const data = await response.json();
    console.log('Объект успешно удален:', data);

    if (containerChilde < 7 && cars > 7) {
      clearCarsContainer();
      createCarsPage(garagePages.PAGE_NUMBER);
    }
    return data;
  } catch (error) {
    console.error('Ошибка при удалении:', error);
    throw error;
  }
}

export default addCarToServer;
