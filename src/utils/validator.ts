import { carsArray } from './data';

const selectedCar = {
  modelContainer: 0,
  carModel: 4,
  svgContainer: 1,
  carSVG: 0,
  id: 0,
};

export default selectedCar;

export async function updateCar(): Promise<void> {
  const currentCar = document.getElementById(`${selectedCar.id}`);
  const carIndex = selectedCar.id - 1;
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

  if (cars[carIndex]) {
    cars[carIndex].color = selectColor.value;
    cars[carIndex].name = selectModel.value;
  }
  console.log(await cars);
}
