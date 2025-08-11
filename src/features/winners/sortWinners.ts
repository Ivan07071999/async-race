import { formWinnersObject } from '../../store/winners/winnerSlice';
import type { winCar } from '../../types/winners';

let sortingUpDirection: boolean = true;

export async function sortWinnersForTime(): Promise<winCar[]> {
  const winners: winCar[] = await formWinnersObject();

  let sortedUp: winCar[];

  if (sortingUpDirection === true) {
    sortedUp = winners.sort((a, b) => a.data.time - b.data.time);
    sortingUpDirection = false;
  } else {
    sortedUp = winners.sort((a, b) => b.data.time - a.data.time);
    sortingUpDirection = true;
  }

  return sortedUp;
}

export async function sortWinnersForWins(): Promise<winCar[]> {
  const winners: winCar[] = await formWinnersObject();

  let sortedUp: winCar[];

  if (sortingUpDirection === true) {
    sortedUp = winners.sort((a, b) => a.data.wins - b.data.wins);
    sortingUpDirection = false;
  } else {
    sortedUp = winners.sort((a, b) => b.data.wins - a.data.wins);
    sortingUpDirection = true;
  }

  return sortedUp;
}
