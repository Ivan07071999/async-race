import createWinnersForm from './createWinnerForm';
import { clearCarsContainer } from '../../utils/clear';
import { appendWinners } from './winnersTable';

async function openWinnersPage(): Promise<void> {
  clearCarsContainer();
  createWinnersForm();
  await appendWinners();
}

export default openWinnersPage;
