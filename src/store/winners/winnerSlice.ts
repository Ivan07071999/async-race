import { loadSVG, cleanSVG } from '../../features/garage/garageItem';
import type { winCar } from '../../types/winners';
import { dragRaceCar } from '../../utils/data';

export async function getWinnersFromServer(): Promise<
  Array<{ id: number; wins: number; time: number }>
> {
  try {
    const response = await fetch('http://localhost:3000/winners');

    if (!response.ok) {
      throw new Error(`Failed to fetch winners. Status: ${response.status}`);
    }

    return (await response.json()) as Array<{
      id: number;
      wins: number;
      time: number;
    }>;
  } catch (error) {
    throw new Error(`Error fetching winners:${error}`);
  }
}

export async function createWinnersRowObject(
  carName: string,
  carColor: string,
  carID: number,
  carWins: number,
  carTime: number
): Promise<winCar> {
  const winnerObject = {
    name: carName,
    color: carColor,
    data: {
      id: carID,
      wins: carWins,
      time: carTime,
    },
  };

  return winnerObject;
}

async function getCarFromGarage(
  id: number
): Promise<{ name: string; color: string }> {
  try {
    const response = await fetch(`http://localhost:3000/garage/${id}`);

    if (response.status === 404) {
      throw new Error(`Car with id ${id} not found in the garage`);
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch car. Status: ${response.status}`);
    }

    const car = (await response.json()) as {
      name: string;
      color: string;
      id: number;
    };

    return {
      name: car.name,
      color: car.color,
    };
  } catch (error) {
    throw new Error(`Error fetching car with id ${id}:${error}`);
  }
}

export async function formWinnersObject(): Promise<winCar[]> {
  const data = await getWinnersFromServer();

  if (data[0].time === 10) {
    data.splice(0, 1);
  }

  const winnersArray = data.map(async item => {
    const car = await getCarFromGarage(item.id);
    return createWinnersRowObject(
      car.name,
      car.color,
      item.id,
      item.wins,
      item.time
    );
  });

  const winners = await Promise.all(winnersArray);
  return winners;
}

export async function getSVG() {
  const svgElement = await loadSVG(dragRaceCar);
  cleanSVG(svgElement);
  return svgElement;
}
