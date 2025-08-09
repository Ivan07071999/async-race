import clearCarsContainer from '../../utils/clear';
import createWinnersForm from './createWinnerForm';
import {
  getWinnersFromServer,
  formWinnersObject,
  appendWinners,
} from '../../store/winners/winnerSlice';

async function openWinnersPage(): Promise<void> {
  clearCarsContainer();
  createWinnersForm();
  console.log(await getWinnersFromServer());
  console.log(await formWinnersObject(), 'newOBJ');
  await appendWinners();
}

export default openWinnersPage;
