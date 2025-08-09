import createCarItem from '../features/garage/garageItem';
import { garagePages } from '../features/garage/garageCreateCars';

export function createCarObject(
  carModel: string,
  carColor: string,
  carID?: number
) {
  return {
    name: carModel,
    color: carColor,
    id: carID,
  };
}

export async function createNewCar(): Promise<
  | {
      name: string;
      color: string;
    }
  | undefined
> {
  const colorCar: HTMLInputElement | null =
    document.querySelector('#inputID-3');
  const carModel: HTMLInputElement | null =
    document.querySelector('#inputID-1');
  const carList = document.querySelectorAll('.car-wrapper');
  const carsContainer = document.querySelector('.form-car');
  const lastChild = carsContainer?.children[carsContainer.children.length - 1];
  const carsLength = document.querySelector('h1') as HTMLElement;
  carsLength.textContent = `Garage(${(garagePages.carsNumber += 1)})`;

  let newIdNumber;

  if (lastChild && lastChild.id) {
    newIdNumber = Number(lastChild.id) + 1;
  } else {
    newIdNumber = 1;
  }

  if (
    colorCar instanceof HTMLInputElement &&
    carModel instanceof HTMLInputElement
  ) {
    const newCar = createCarObject(carModel.value, colorCar.value);

    if (carList.length < 7) {
      carsContainer?.appendChild(
        await createCarItem(newCar.name, newCar.color, newIdNumber)
      );
    }
    carModel.value = '';
    return newCar;
  }
  return undefined;
  // console.log(await carsArray);
}

export default createNewCar;
