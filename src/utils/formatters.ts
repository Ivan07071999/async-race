import type { ICar } from '../store/garage/garageThunks';
import createCarItem from '../features/garage/garageItem';

async function createNewCar() {
  const colorCar: HTMLInputElement | null =
    document.querySelector('#inputID-3');
  const carModel: HTMLInputElement | null =
    document.querySelector('#inputID-1');
  const carList = document.querySelectorAll('.car-wrapper');
  const carsContainer = document.querySelector('.form-car');

  if (
    colorCar instanceof HTMLInputElement &&
    carModel instanceof HTMLInputElement
  ) {
    const newCar: ICar = {
      name: carModel.value,
      color: colorCar.value,
      id: carList.length + 1,
    };

    carsContainer?.appendChild(
      await createCarItem(newCar.name, newCar.color, newCar.id)
    );
  }
}

export default createNewCar;
