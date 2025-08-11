import { formWinnersObject } from '../../store/winners/winnerSlice';
import { clearWinnerTable } from '../../utils/clear';
import type { winCar } from '../../types/winners';
import { createRowElements } from './winnerRow';
import { sortWinnersForTime, sortWinnersForWins } from './sortWinners';

export function updateWinners(winners: winCar[]): Promise<void> {
  const winnersContainer =
    document.querySelector<HTMLDivElement>('.winners-info');

  if (!winnersContainer) {
    console.error('Container not found');
    return Promise.resolve();
  }

  const promises = winners.map(async (item, ind) => {
    const rowElement = await createRowElements(
      String(ind + 1),
      '',
      item.name,
      String(item.data.wins),
      String(item.data.time)
    );

    const carSVG = rowElement.children[1]?.children[0] as
      | SVGElement
      | undefined;

    if (carSVG) {
      carSVG.setAttribute('fill', item.color);
    }

    winnersContainer.appendChild(rowElement);
  });

  return Promise.all(promises).then(() => {});
}

export async function appendWinners(): Promise<void> {
  const data: winCar[] = await formWinnersObject();

  updateWinners(data);
}

export async function formSortedForTime(): Promise<void> {
  const data: winCar[] = await sortWinnersForTime();

  clearWinnerTable();
  updateWinners(data);
}

export async function formSortedForWins(): Promise<void> {
  const data: winCar[] = await sortWinnersForWins();

  clearWinnerTable();
  updateWinners(data);
}
