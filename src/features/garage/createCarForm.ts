import createCarsList from './garageList';

async function createCarForm(): Promise<HTMLDivElement> {
  const carForm = document.createElement('div');
  carForm.className = 'form-car';
  const carList = await createCarsList();
  carList.map(car => carForm.appendChild(car));

  return carForm;
}

export default createCarForm;
