import { carsColors, carsModels, PAGE_LENGTH } from '../../utils/data';
import createCarItem from './garageItem';
import getCars, { type ICar } from '../../store/garage/garageThunks';
import addCarToServer from '../../store/garage/garageSlice';
import {
  enabledNextButton,
  disabledButtons,
  enabledButtonPreview,
} from '../../utils/disableButtons';
import {
  updateHeadElement,
  updateSubheadElement,
} from '../../utils/headElements';

export const garagePages = {
  count: 0,
  PAGE_NUMBER: 0,
  carsNumber: 4,
};

export async function createCarsPage(page: number) {
  updateSubheadElement();
  const clearedCarsContainer =
    document.querySelector<HTMLDivElement>('.form-car')!;
  const data: ICar[] = await getCars();
  const currentPAge: ICar[] = (await data).slice(
    page * PAGE_LENGTH,
    page * PAGE_LENGTH + PAGE_LENGTH
  );
  console.log(currentPAge);

  const carElements = await Promise.all(
    currentPAge.map(async car =>
      clearedCarsContainer.appendChild(
        await createCarItem(car.name, car.color, car.id)
      )
    )
  );

  if ((await data).length > PAGE_LENGTH) {
    enabledNextButton();
  }

  if (garagePages.PAGE_NUMBER > 0) {
    enabledButtonPreview();
  }
  disabledButtons(garagePages.PAGE_NUMBER);
  return carElements;
}

function createRandomCar(): {
  name: string;
  color: string;
} {
  const randomIndex: number = Math.floor(Math.random() * 20);

  updateHeadElement();

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
