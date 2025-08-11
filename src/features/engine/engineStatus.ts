import {
  getCurrentPosition,
  stopCarAnimation,
  resetAnimationState,
  handleCarBreakdown,
} from './enginePage';
import updateWinnersOnServer from '../../store/winners/winnersThunks';
import {
  disabledButtons,
  enableCarButtons,
  enableHeaderForms,
  enableWinnersButton,
} from '../../utils/disableButtons';
import { garagePages } from '../garage/garageCreateCars';
import { startDrive } from './engineControls';
import controlTimer, { TIMER } from '../../utils/timer';

export function handleStartError(
  id: number,
  svgElement: HTMLElement,
  error: unknown
) {
  console.error(`Error starting car ${id}:`, error);
  const currentPosition = getCurrentPosition(svgElement);
  stopCarAnimation(svgElement, currentPosition);

  if (error instanceof Error) {
    if (error.message.includes('429')) {
      console.log('Car is already in drive mode');
    } else if (error.message.includes('404')) {
      console.log('Engine not started or car not found');
    }
  }
  resetAnimationState(id);
}

// Обработка запроса на движение
export async function handleDriveRequest(id: number, svgElement: HTMLElement) {
  try {
    await startDrive(id);
    if (TIMER.status !== false) {
      updateWinnersOnServer(id);
    }
    TIMER.status = false;

    controlTimer();
    disabledButtons(garagePages.PAGE_NUMBER);
    enableWinnersButton();
    enableHeaderForms();
    enableCarButtons();
    console.log(`Drive completed successfully for car ${id}`);
  } catch (error) {
    if (error instanceof Error && error.message.includes('500')) {
      console.log(`Car ${id} broke down during the race`);
      const currentPosition = getCurrentPosition(svgElement);
      handleCarBreakdown(svgElement, currentPosition);
      resetAnimationState(id);
    } else {
      throw error;
    }
  }
}
