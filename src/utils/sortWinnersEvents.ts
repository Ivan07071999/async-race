import {
  formSortedForTime,
  formSortedForWins,
} from '../features/winners/winnersTable';

export default function addSortEvents() {
  const winnerTime: HTMLElement | null = document.querySelector('.winner-time');
  if (winnerTime) {
    winnerTime.style.cursor = 'pointer';
    winnerTime.addEventListener('click', () => formSortedForTime());
  }

  const winnerWins: HTMLElement | null = document.querySelector('.winner-wins');
  if (winnerWins) {
    winnerWins.style.cursor = 'pointer';
    winnerWins.addEventListener('click', () => formSortedForWins());
  }
}
