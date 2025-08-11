import sendEngineRequest from '../../store/engine/engineThunks';
import animationStates from '../../types/engine';

export function startRace(selector: string) {
  const startRaceButtons = document.querySelectorAll(`.${selector}`);

  const clickPromises = Array.from(startRaceButtons).map(button => {
    return new Promise<void>(resolve => {
      (button as HTMLElement).click();
      resolve();
    });
  });

  Promise.all(clickPromises).then(() => {
    console.log('Все кнопки нажаты одновременно');
  });
}

// Функция запуска двигателя
export async function startEngine(
  id: number
): Promise<{ velocity: number; distance: number }> {
  try {
    const response = await sendEngineRequest(id, 'started');
    return response;
  } catch (error) {
    console.error('Failed to start engine:', error);
    throw error;
  }
}

// Функция остановки двигателя
export async function stopEngine(
  id: number
): Promise<{ velocity: number; distance: number }> {
  try {
    const response = await sendEngineRequest(id, 'stopped');
    return response;
  } catch (error) {
    console.error('Failed to stop engine:', error);
    throw error;
  }
}

// Функция начала движения
export async function startDrive(id: number): Promise<{ success: boolean }> {
  try {
    const response = await sendEngineRequest(id, 'drive');
    return response;
  } catch (error) {
    console.error('Failed to start drive:', error);
    throw error;
  }
}

// Функция для кнопки B (остановка двигателя)
export async function stopCarEngine(id: number, svgElement: HTMLElement) {
  try {
    await stopEngine(id);
    console.log(`Engine stopped for car ${id}`);

    // Останавливаем анимацию через глобальное состояние
    const state = animationStates[id];
    if (state) {
      state.isDriving = false;
      if (state.animationFrameId) {
        cancelAnimationFrame(state.animationFrameId);
        state.animationFrameId = null;
      }
    }

    // Сбрасываем позицию и стили
    svgElement.style.transform = 'translateX(0)';
    svgElement.style.filter = '';
    svgElement.style.opacity = '';
    svgElement.style.transition = 'none';
    svgElement.style.animation = '';
  } catch (error) {
    console.error(`Error stopping car ${id}:`, error);
  }
}
