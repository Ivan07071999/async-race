import { carsColors, carsModels, carsArray } from '../../utils/data';
import createCarItem from './garageItem';
import type { ICar } from '../../store/garage/garageThunks';
// import clearCarsContainer from '../../utils/clear';

export const garagePages = {
  count: 0,
  PAGE_NUMBER: 0,
};

export async function createCarsPage(page: number) {
  const clearedCarsContainer =
    document.querySelector<HTMLDivElement>('.form-car')!;
  const currentPAge = (await carsArray).slice(page, page + 7);
  console.log(currentPAge);

  const carElements = await Promise.all(
    currentPAge.map(async car =>
      clearedCarsContainer.appendChild(
        await createCarItem(car.name, car.color, car.id)
      )
    )
  );
  console.log(carElements, 'car element');
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
  if (garagePages.count === 100) {
    garagePages.count = 0;
    return;
  }

  (await carsArray).push(pushCarInArray((await carsArray).length + 1));
  garagePages.count += 1;
  // console.log(await carsArray);
  return pushCarsInCarsArray();
}
