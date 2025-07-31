const selectedCar = {
  modelContainer: 0,
  carModel: 4,
  svgContainer: 1,
  carSVG: 0,
  id: 0,
};

export default selectedCar;

export function updateCar(): void {
  const currentCar = document.getElementById(`${selectedCar.id}`);
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
}
