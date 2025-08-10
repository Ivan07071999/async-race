import {
  sortWinnersForTime,
  sortWinnersForWins,
} from '../../store/winners/winnerSlice';
import { createRowElements } from './winnerRow';
import { clearWinnerTable } from '../../utils/clear';

export async function formSortedForTime() {
  const data = await sortWinnersForTime();
  const winnersContainer = document.querySelector('.winners-info');
  clearWinnerTable();

  if (!winnersContainer) {
    console.error('Container not found');
    return;
  }

  data.forEach(async (item, ind) => {
    const rowElement = await createRowElements(
      String(ind + 1),
      '',
      item.name,
      String(item.data.wins),
      String(item.data.time)
    );

    const carSVG = rowElement.children[1].children[0];
    carSVG.setAttribute('fill', item.color);

    winnersContainer.appendChild(rowElement);
  });
}

export async function formSortedForWins() {
  const data = await sortWinnersForWins();
  const winnersContainer = document.querySelector('.winners-info');
  clearWinnerTable();

  if (!winnersContainer) {
    console.error('Container not found');
    return;
  }

  console.log(await data, 'data');

  data.forEach(async (item, ind) => {
    const rowElement = await createRowElements(
      String(ind + 1),
      '',
      item.name,
      String(item.data.wins),
      String(item.data.time)
    );

    const carSVG = rowElement.children[1].children[0];
    carSVG.setAttribute('fill', item.color);

    winnersContainer.appendChild(rowElement);
  });
}
