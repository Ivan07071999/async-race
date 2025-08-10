import createWinnersForm from './createWinnerForm';
import {
  getWinnersFromServer,
  formWinnersObject,
  appendWinners,
} from '../../store/winners/winnerSlice';
import clearCarsContainer from '../../utils/clear';

async function openWinnersPage(): Promise<void> {
  clearCarsContainer();
  createWinnersForm();
  console.log(await getWinnersFromServer());
  console.log(await formWinnersObject(), 'newOBJ');
  await appendWinners();
}

export default openWinnersPage;
