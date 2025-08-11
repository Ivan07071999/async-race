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
  const currentPosition = getCurrentPosition(svgElement);
  stopCarAnimation(svgElement, currentPosition);

  resetAnimationState(id);
  throw new Error(`Error starting car ${id}:${error}`);
}

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
  } catch (error) {
    if (error instanceof Error && error.message.includes('500')) {
      const currentPosition = getCurrentPosition(svgElement);
      handleCarBreakdown(svgElement, currentPosition);
      resetAnimationState(id);
    } else {
      throw error;
    }
  }
}
