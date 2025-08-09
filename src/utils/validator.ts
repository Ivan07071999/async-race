// import type { ICar } from '../store/garage/garageThunks';
import { carsArray } from './data';

const selectedCar = {
  modelContainer: 0,
  carModel: 4,
  svgContainer: 1,
  carSVG: 0,
  id: 0,
};

export default selectedCar;

export async function updateServerCar(
  carId: number,
  updatedData: { name: string; color: string }
) {
  try {
    const serverUrl = 'http://localhost:3000';
    const url = new URL(`/garage/${carId}`, serverUrl);
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('Объект успешно обновлен:', data);
    return data;
  } catch (error) {
    console.error('Ошибка при обновлении:', error);
  }
}

export async function updateCar(): Promise<void> {
  const currentCar = document.getElementById(`${selectedCar.id}`);
  const carIndex = selectedCar.id;
  const cars = await carsArray;
  const selectColor: HTMLInputElement = document.querySelector('#inputID-4')!;
  const selectModel: HTMLInputElement = document.querySelector('#inputID-2')!;

  const carModel = currentCar?.children[selectedCar.modelContainer].children[
    selectedCar.carModel
  ] as HTMLSpanElement;

  const svgElement = currentCar?.children[selectedCar.svgContainer]?.children[
    selectedCar.carSVG
  ] as HTMLInputElement;

  if (svgElement && carModel) {
    svgElement.style.color = selectColor.value;
    carModel.textContent = selectModel.value;
  }

  updateServerCar(carIndex, {
    name: selectModel.value,
    color: selectColor.value,
  });

  selectModel.value = '';
  console.log(await cars);
}
