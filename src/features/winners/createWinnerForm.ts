import { createRowElements } from './winnerRow';
import './winners.css';
import addSortEvents from '../../utils/sortWinnersEvents';

async function createWinnersForm(): Promise<HTMLDivElement> {
  const formCars: HTMLElement | null = document.querySelector('.form-car');
  const winnersInfo: HTMLDivElement = document.createElement('div');
  winnersInfo.className = 'winners-info';

  const winnersForm: HTMLDivElement = document.createElement('div');
  winnersForm.className = 'form-winners';

  if (formCars) {
    formCars.appendChild(winnersForm);
  }

  const headerRow: HTMLElement = await createRowElements(
    'Number',
    'Car',
    'Name',
    'Wins',
    'Best time(sec.)'
  );

  winnersForm.appendChild(headerRow);
  winnersForm.appendChild(winnersInfo);
  addSortEvents();

  return winnersForm;
}

export default createWinnersForm;
