import { createHeaderButtons } from '../../components/ui/button';
import getCars from '../../store/garage/garageThunks';
import selectedCar from '../../utils/validator';

export async function loadSVG(url: RequestInfo | URL) {
  const response = await fetch(url);
  const svgText = await response.text();
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
  const svgElement = svgDoc.documentElement;
  return svgElement;
}

function cleanSVG(svgElement: HTMLElement) {
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

  A.className = 'button-control';
  B.className = 'button-control';
  remove.className = 'button-change';
  select.className = 'button-change';

  remove.addEventListener('click', async () => {
    car.remove();
    const data: object[] = await getCars();
    await data.splice(ID - 1, 1);
  });

  select.addEventListener('click', async () => {
    selectedCar.id = ID;
  });

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
