import { createRowElements } from '../../features/winners/winnerRow';

type winCar = {
  name: string;
  color: string;
  data: {
    wins: number;
    time: number;
  };
};

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
    console.error('Error fetching winners:', error);
    throw error;
  }
}

export async function createWinnersRowObject(
  carName: string,
  carColor: string,
  carWins: number,
  carTime: number
): Promise<winCar> {
  const winnerObject = {
    name: carName,
    color: carColor,
    data: {
      wins: carWins,
      time: carTime,
    },
  };

  return winnerObject;
}

export async function formWinnersObject(): Promise<winCar[]> {
  const data = await getWinnersFromServer();

  const winnersArray = data.map(item =>
    createWinnersRowObject('name', 'red', item.wins, item.time)
  );

  const winners = await Promise.all(winnersArray);

  return winners;
}

export async function appendWinners() {
  const winnersContainer = document.querySelector('.winners-info');

  if (!winnersContainer) {
    console.error('Container not found');
    return;
  }

  const data = await formWinnersObject();

  data.forEach(async (item, ind) => {
    const rowElement = await createRowElements(
      String(ind + 1),
      'MTZ',
      'Ford',
      String(item.data.wins),
      String(item.data.time)
    );
    winnersContainer.appendChild(rowElement);
  });
}
