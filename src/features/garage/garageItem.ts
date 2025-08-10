import { createHeaderButtons } from '../../components/ui/button';
import getCars from '../../store/garage/garageThunks';
import selectedCar from '../../utils/validator';
import { startAndAnimateCar, stopCarEngine } from '../engine/enginePage';
import { createCarsPage, garagePages } from './garageCreateCars';
import clearCarsContainer from '../../utils/clear';
import { type ICar } from '../../store/garage/garageThunks';
import { deleteWinnerFromServer } from '../../store/winners/winnersThunks';

export async function deleteServerCar(carId: number) {
  const carsLength = document.querySelector('h1') as HTMLElement;
  carsLength.textContent = `Garage(${(garagePages.carsNumber -= 1)})`;
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
    throw error; // Пробрасываем ошибку дальше для обработки
  }
}

export async function loadSVG(url: RequestInfo | URL) {
  const response = await fetch(url);
  const svgText = await response.text();
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
  const svgElement = svgDoc.documentElement;
  return svgElement;
}

export function cleanSVG(svgElement: HTMLElement) {
  const elementsWithStyle = svgElement.querySelectorAll('[style]');
  elementsWithStyle.forEach(el => el.removeAttribute('style'));
  svgElement.setAttribute('fill', 'currentColor');
}

export async function createCarItem(
  name: string,
  color: string,
  ID: number
): Promise<HTMLDivElement> {
  const car = document.createElement('div');
  car.id = `${ID}`;
  const road = document.createElement('div');
  road.className = 'road';

  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'button-container';
  const carHead = document.createElement('span');

  const svgElement = await loadSVG('/src/assets/drag-race-car.svg');
  cleanSVG(svgElement);
  svgElement.setAttribute('width', '45');
  svgElement.setAttribute('height', '45');
  svgElement.style.color = color;

  const { select } = createHeaderButtons();
  const { remove } = createHeaderButtons();
  const A = createHeaderButtons().a;
  const B = createHeaderButtons().b;

  A.className = 'button-control button-start';
  B.className = 'button-control button-stop';
  remove.className = 'button-change';
  select.className = 'button-change';

  remove.addEventListener('click', async () => {
    car.remove();
    deleteServerCar(ID);
    deleteWinnerFromServer(ID);
  });

  select.addEventListener('click', async () => {
    selectedCar.id = ID;
    console.log(ID);
  });

  A.addEventListener('click', () => startAndAnimateCar(ID, svgElement));
  B.addEventListener('click', () => stopCarEngine(ID, svgElement));

  const flag = document.createElement('img');
  flag.src = '/src/assets/flag.png';
  flag.className = 'flag';

  carHead.textContent = name;

  car.className = 'car-wrapper';

  car.appendChild(buttonsContainer);
  buttonsContainer.appendChild(select);
  buttonsContainer.appendChild(remove);
  buttonsContainer.appendChild(A);
  buttonsContainer.appendChild(B);
  buttonsContainer.appendChild(carHead);
  car.appendChild(road);
  road.appendChild(svgElement);
  road.appendChild(flag);

  return car;
}

export default createCarItem;
