import createCarForm from './createCarForm';
import { type ICar } from '../../store/garage/garageThunks';
import getCars from '../../store/garage/garageThunks';
import { garagePages } from './garageCreateCars';

async function createGaragePage() {
  const numberCar = await getCars<ICar[]>();
  const garage = document.createElement('section');
  const head = document.createElement('h1');
  const subHead = document.createElement('h3');
  garage.className = 'garage';
  head.textContent = `Garage(${numberCar.length})`;
  garagePages.carsNumber = numberCar.length;
  subHead.textContent = 'Page #1';
  garage.appendChild(head);
  garage.appendChild(subHead);
  garage.appendChild(await createCarForm());
  return garage;
}

export async function uploadGarage(cars: ICar[]) {
  const serverUrl = 'http://localhost:3000';
  const url = new URL('/garage', serverUrl);

  try {
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cars),
    });
    if (!response.ok) {
      throw new Error(`Ошибка при отправке: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Данные успешно отправлены:', data);
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
  }
}

export default createGaragePage;
