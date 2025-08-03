import getCars from '../../store/garage/garageThunks';
import createCarItem from './garageItem';
import { type ICar } from '../../store/garage/garageThunks';

async function createCarsList() {
  const data = await getCars<ICar[]>();
  console.log(data, 'data');
  const carElements = await Promise.all(
    data.map((item, index) => createCarItem(item.name, item.color, index + 1))
  );
  console.log(carElements, 'car element');
  return carElements;
}

export default createCarsList;
