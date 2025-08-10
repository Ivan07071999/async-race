import { createRowElements } from './winnerRow';
import './winners.css';
import { formSortedForTime, formSortedForWins } from './winnersTable';

async function createWinnersForm(): Promise<HTMLDivElement> {
  const formCars = document.querySelector('.form-car');
  const winnersInfo = document.createElement('div');
  winnersInfo.className = 'winners-info';
  const winnersForm: HTMLDivElement = document.createElement('div');
  winnersForm.className = 'form-winners';
  formCars?.appendChild(winnersForm);
  winnersForm.appendChild(
    await createRowElements('Number', 'Car', 'Name', 'Wins', 'Best time(sec.)')
  );
  winnersForm.appendChild(winnersInfo);

  const winnerTime = document.querySelector<HTMLElement>('.winner-time');
  winnerTime?.addEventListener('click', () => formSortedForTime());
  winnerTime.style.cursor = 'pointer';

  const winnerWins = document.querySelector<HTMLElement>('.winner-wins');
  winnerWins?.addEventListener('click', () => formSortedForWins());
  winnerWins.style.cursor = 'pointer';

  return winnersForm;
}

export default createWinnersForm;
