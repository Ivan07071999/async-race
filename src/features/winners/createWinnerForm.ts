import { createRowElements } from './winnerRow';
import './winners.css';

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

  return winnersForm;
}

export default createWinnersForm;
