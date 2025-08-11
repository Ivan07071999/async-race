import getCars from '../../store/garage/garageThunks';
import createCarItem from './garageItem';
import { type ICar } from '../../store/garage/garageThunks';

async function createCarsList() {
  const data = await getCars<ICar[]>();

  const limitedData = data.slice(0, 7);

  const carElements = await Promise.all(
    limitedData.map(item => createCarItem(item.name, item.color, item.id))
  );

  return carElements;
}

export default createCarsList;
