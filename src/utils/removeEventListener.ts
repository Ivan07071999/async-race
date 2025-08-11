import {
  formSortedForTime,
  formSortedForWins,
} from '../features/winners/winnersTable';
import { startAndAnimateCar } from '../features/engine/enginePage';
import { stopCarEngine } from '../features/engine/engineControls';
import { deleteServerCar } from '../store/garage/garageSlice';
import { deleteWinnerFromServer } from '../store/winners/winnersThunks';

export function removeWinnersEvents(): void {
  const winnerTime: HTMLElement | null = document.querySelector('.winner-time');
  if (winnerTime) {
    winnerTime.removeEventListener('click', () => formSortedForTime);
  }

  const winnerWins: HTMLElement | null = document.querySelector('.winner-wins');
  if (winnerWins) {
    winnerWins.removeEventListener('click', () => formSortedForWins);
  }
}

export function removeGarageEvents(): void {
  const startButton: HTMLElement | null =
    document.querySelector('.button-start');
  const stopButton: HTMLElement | null = document.querySelector('.button-stop');
  const removeButton: HTMLElement | null = document.querySelector('.remove');
  if (removeButton) {
    removeButton.removeEventListener('click', () => deleteServerCar);
    removeButton.removeEventListener('click', () => deleteWinnerFromServer);
  }

  if (startButton && stopButton) {
    startButton.removeEventListener('click', () => startAndAnimateCar);
    stopButton.removeEventListener('click', () => stopCarEngine);
  }
}
